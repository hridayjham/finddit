import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  CollectionReference,
  getDocs,
  query,
  where,
  or,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { get } from 'http';

@Injectable()
export class UsersService {
  private db: Firestore;
  private usersRef: CollectionReference;
  constructor(private readonly dbService: DbService) {
    this.db = this.dbService.getDB();
    this.usersRef = collection(this.db, 'users');
  }
  async create(createUserDto: CreateUserDto) {
    try {
      await setDoc(doc(this.usersRef, createUserDto.email), {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        iconID: createUserDto.iconID,
        email: createUserDto.email,
        firstNameLower: createUserDto.firstName.toLowerCase(),
        lastNameLower: createUserDto.lastName.toLowerCase(),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    return `A new user with email ID: ${createUserDto.email} has been created!`;
  }

  async findAll() {
    const querySnapshot = await getDocs(this.usersRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
    return `This action returns all users`;
  }

  async findByEmailOrName(emailOrName: string) {
    var foundByEmail = await this.findOne(emailOrName);
    if (foundByEmail == null) {
      return await this.findByName(emailOrName);
    }
    return foundByEmail;
  }

  async findOne(email_id: string) {
    try {
      const userDocs = await getDoc(doc(this.usersRef, email_id));
      const userData = userDocs.data();
      if (userData == undefined) {
        return null;
      }
      return [
        new CreateUserDto(
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.iconID,
        ),
      ];
    } catch (e) {
      console.error('Error finding document: ', e);
    }
  }

  async findByName(name: string) {
    try {
      const userList: CreateUserDto[] = [];
      const nameLower = name.toLowerCase();
      const queryFindUserByName = query(
        this.usersRef,
        or(
          where('firstNameLower', '==', nameLower),
          where('lastNameLower', '==', nameLower),
        ),
      );
      const querySnapshot = await getDocs(queryFindUserByName);
      if (querySnapshot.empty) {
        return null;
      }
      for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        userList.push(
          new CreateUserDto(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.iconID,
          ),
        );
      }
      return userList;
    } catch (e) {
      console.error('Error finding document: ', e);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(email: string) {
    try {
      await deleteDoc(doc(this.usersRef, email));
      return `User with the email: #${email} was removed successfully!`;
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
}
