import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { CheckinMemberDto } from './dto/checkin-member.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post('group-member-checkin-to-group')
  groupMemberCheckInToGroup(@Body() checkinParams: CheckinMemberDto) {
    console.log(JSON.stringify(checkinParams));
    return this.groupsService.groupMemberCheckInToGroup(
      checkinParams.memberEmail,
      checkinParams.groupID,
      checkinParams.memberPreferences,
    );
  }

  @Post('user-used-superdislike/:groupId/:email')
  userUsedSuperDislike(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.updateParametersForUser(
      'memberUsedSuperDislike',
      email,
      groupId,
    );
  }

  @Post('user-finished-voting/:groupId/:email')
  userFinishedVoting(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.updateParametersForUser(
      'memberFinishedVoting',
      email,
      groupId,
    );
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('active-groups/:email')
  getActiveGroupsForUser(@Param('email') email: string) {
    return this.groupsService.getActiveGroupsForUser(email);
  }

  @Get('inactive-groups/:email')
  getInactiveGroupsForUser(@Param('email') email: string) {
    return this.groupsService.getInactiveGroupsForUser(email);
  }

  @Get('group-card-data/:groupId')
  getDataForCards(@Param('groupId') groupId: string) {
    return this.groupsService.getDataForCards(groupId);
  }

  @Get('checked-in-members/:groupId')
  getCheckedInMembersForGroup(@Param('groupId') groupId: string) {
    return this.groupsService.getCheckedInMembersForGroup(groupId);
  }

  @Get('check-if-user-checked-in/:groupId/:email')
  checkIfUserCheckedIn(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.getParametersForUser(
      'memberCheckedInGroup',
      email,
      groupId,
    );
  }

  @Get('check-if-user-used-superdislike/:groupId/:email')
  checkIfUserUsedSuperDislike(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.getParametersForUser(
      'memberUsedSuperDislike',
      email,
      groupId,
    );
  }

  @Get('check-if-user-finished-voting/:groupId/:email')
  checkIfUserFinishedVoting(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.getParametersForUser(
      'memberFinishedVoting',
      email,
      groupId,
    );
  }

  @Get('group-metadata/:groupId')
  getGroupMetadata(@Param('groupId') groupId: string) {
    return this.groupsService.getGroupMetadata(groupId);
  }

  @Get('member-data-from-group/:groupId/:email')
  getUserDataFromGroup(
    @Param('groupId') groupId: string,
    @Param('email') email: string,
  ) {
    return this.groupsService.getUserDataFromGroup(groupId, email);
  }

  @Post('swipe-on-restaurant/:groupId/:restaurantId/:swipeDirection')
  swipeOnRestaurant(
    @Param('groupId') groupId: string,
    @Param('restaurantId') restaurantId: string,
    @Param('swipeDirection') swipeDirection: string,
  ) {
    return this.groupsService.swipeOnRestaurant(
      groupId,
      restaurantId,
      swipeDirection,
    );
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
