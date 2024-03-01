import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { DbService } from 'src/db/db.service';
import { NearbySearchService } from 'src/nearby-search/nearby-search.service';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  CollectionReference,
  DocumentReference,
  getDocs,
  query,
  where,
  or,
  deleteDoc,
  updateDoc,
  orderBy,
  getDoc,
  limit,
  doc,
  increment,
} from 'firebase/firestore';
import { RestaurantDto } from 'src/dto/restaurant-response.dto';
import { GroupMemberPreferencesDto } from './dto/group-member-preferences.dto';

@Injectable()
export class GroupsService {
  private db: Firestore;
  private groupsRef: CollectionReference;
  constructor(
    private readonly dbService: DbService,
    private readonly nearbySearchService: NearbySearchService,
  ) {
    this.db = this.dbService.getDB();
    this.groupsRef = collection(this.db, 'groups');
  }
  async create(createGroupDto: CreateGroupDto) {
    try {
      createGroupDto.groupMembersEmails.push(createGroupDto.groupAdminEmail);
      const docRef = await addDoc(this.groupsRef, {
        groupName: createGroupDto.groupName,
        groupIconID: createGroupDto.groupIconID,
        groupAdminEmail: createGroupDto.groupAdminEmail,
        groupMembersEmails: createGroupDto.groupMembersEmails,
        votingDeadline: createGroupDto.votingDeadline,
        isActive: createGroupDto.isActive,
        adminPreferences: createGroupDto.adminPreferences,
        timeStamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      //TODO: Implement a function to send notification to user being added to a group
      const restuarantData: RestaurantDto[] =
        await this.nearbySearchService.getNearbyRestaurants(
          createGroupDto.adminPreferences,
        );
      await this.addRestaurantDataToGroup(restuarantData, docRef.id);
      await this.addGroupMembersToGroup(
        docRef.id,
        createGroupDto.groupMembersEmails,
        createGroupDto.groupAdminEmail,
      );
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      return;
    }
  }

  async addGroupMembersToGroup(
    currentGroupRefID: string,
    groupMembersEmails: string[],
    groupAdminEmail: string,
  ) {
    try {
      groupMembersEmails.push(groupAdminEmail);
      for (const groupMemberEmail of groupMembersEmails) {
        var groupMemberSubCollectionRef = doc(
          this.groupsRef,
          currentGroupRefID,
          'groupMembers',
          groupMemberEmail,
        );
        await setDoc(groupMemberSubCollectionRef, {
          memberPreferences: {},
          memberVotes: {},
          memberUsedSuperDislike: false,
          memberCheckedInGroup: false,
          memberCheckinTimestamp: null,
          memberFinishedVoting: false,
        });
      }
      return `Admin & Members have been added to group ${currentGroupRefID}!`;
    } catch (e) {
      console.error('Error adding document: ', e);
      return;
    }
  }

  async updateParametersForUser(
    contextParameter: string,
    groupMemberEmail: string,
    currentGroupRefID: string,
  ) {
    // contextParameter = "memberUsedSuperDislike" or "memberFinishedVoting"
    var groupMemberSubCollectionRef = doc(
      this.groupsRef,
      currentGroupRefID,
      'groupMembers',
      groupMemberEmail,
    );
    await updateDoc(groupMemberSubCollectionRef, {
      [contextParameter]: true,
    });
  }

  async getParametersForUser(
    contextParameter: string,
    groupMemberEmail: string,
    currentGroupRefID: string,
  ) {
    // contextParameter = "memberUsedSuperDislike" or "memberFinishedVoting" or "memberCheckedInGroup"
    var groupMemberSubCollectionRef = doc(
      this.groupsRef,
      currentGroupRefID,
      'groupMembers',
      groupMemberEmail,
    );
    const querySnapshot = await getDoc(groupMemberSubCollectionRef);
    if (querySnapshot.exists()) {
      return querySnapshot.data()[contextParameter];
    }
  }

  async addRestaurantDataToGroup(restaurantData, currentGroupRefID: string) {
    var groupRestaurantSubCollectionRef = collection(
      this.groupsRef,
      currentGroupRefID,
      'groupRestaurants',
    );
    const promises = restaurantData.map(async (restaurant) => {
      await addDoc(groupRestaurantSubCollectionRef, {
        business_status: restaurant.business_status,
        lat: restaurant.lat,
        long: restaurant.long,
        name: restaurant.name,
        place_opening_hours: restaurant.place_opening_hours,
        photos: restaurant.photos,
        place_id: restaurant.place_id,
        plus_code: restaurant.plus_code,
        price_level: restaurant.price_level,
        rating: restaurant.rating,
        user_ratings_total: restaurant.user_ratings_total,
        vicinity: restaurant.vicinity,
      });
    });
    await Promise.all(promises);
    return `Restaurants have been added to group ${currentGroupRefID}!`;
  }
  async findAll() {
    const querySnapshot = await getDocs(this.groupsRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
    return `This action returns all groups`;
  }

  async getActiveGroupsForUser(userEmail: string) {
    const activeGroups = [];
    const querySnapshot = await getDocs(
      query(
        this.groupsRef,
        where('groupMembersEmails', 'array-contains', userEmail),
        where('isActive', '==', true),
        orderBy('timeStamp', 'desc'),
      ),
    );

    const promises = querySnapshot.docs.map(async (doc) => {
      console.log(doc.id);
      let obj = { groupID: doc.id, groupMetadata: {} };
      obj.groupMetadata = await this.getGroupMetadata(doc.id);
      activeGroups.push(obj);
    });

    await Promise.all(promises);
    return activeGroups;
  }

  async groupMemberCheckInToGroup(
    groupMemberEmail: string,
    currentGroupRefID: string,
    memberPreferences: GroupMemberPreferencesDto,
  ) {
    var groupMemberSubCollectionRef = doc(
      this.groupsRef,
      currentGroupRefID,
      'groupMembers',
      groupMemberEmail,
    );
    await updateDoc(groupMemberSubCollectionRef, {
      memberCheckedInGroup: true,
      memberCheckinTimestamp: new Date(),
      memberPreferences: memberPreferences,
    });
  }

  async getInactiveGroupsForUser(userEmail: string) {
    const querySnapshot = await getDocs(
      query(
        this.groupsRef,
        where('groupMembersEmails', 'array-contains', userEmail),
        where('isActive', '==', false),
        orderBy('timeStamp', 'desc'),
        limit(5),
      ),
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  async getDataForCards(currentGroupRefID: string) {
    var cardData = [];
    const querySnapshot = await getDocs(
      collection(this.groupsRef, currentGroupRefID, 'groupRestaurants'),
    );
    querySnapshot.forEach((doc) => {
      cardData.push(doc.data());
    });
    return cardData;
  }

  async getCheckedInMembersForGroup(currentGroupRefID: string) {
    var checkedInMembers = [];
    const querySnapshot = await getDocs(
      collection(this.groupsRef, currentGroupRefID, 'groupMembers'),
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().memberCheckedInGroup) {
        checkedInMembers.push(doc.id);
      }
    });
    return checkedInMembers;
  }

  async getGroupMetadata(currentGroupRefID: string) {
    const docRef = doc(this.groupsRef, currentGroupRefID);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log(docSnapshot.data());
      return docSnapshot.data();
    }
  }

  async getUserDataFromGroup(currentGroupRefID: string, userEmail: string) {
    const docRef = doc(
      this.groupsRef,
      currentGroupRefID,
      'groupMembers',
      userEmail,
    );
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  }

  async swipeOnRestaurant(
    currentGroupRefID: string,
    restaurantID: string,
    swipeDirection: string,
  ) {
    const swipeDirectionToDoc = {
      right: 'rightSwipes',
      left: 'leftSwipes',
      down: 'superDislikes',
    };
    var voteRestaurantDocRef = doc(
      this.groupsRef,
      currentGroupRefID,
      'groupVotes',
      restaurantID,
    );

    try {
      await updateDoc(voteRestaurantDocRef, {
        [swipeDirectionToDoc[swipeDirection]]: increment(1),
      });
    } catch (e) {
      await setDoc(voteRestaurantDocRef, {
        [swipeDirectionToDoc[swipeDirection]]: increment(1),
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
