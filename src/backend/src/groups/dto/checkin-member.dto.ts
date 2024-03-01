import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NearbyRequestDto } from 'src/dto/nearby-request.dto';
import { GroupMemberPreferencesDto } from './group-member-preferences.dto';
export class CheckinMemberDto {
  constructor(
    groupID: string,
    memberEmail: string,
    memberPreferences: GroupMemberPreferencesDto,
  ) {
    this.groupID = groupID;
    this.memberEmail = memberEmail;
    this.memberPreferences = memberPreferences;
  }

  @ApiProperty()
  groupID: string;
  @ApiProperty()
  memberEmail: string;
  @ApiProperty()
  memberPreferences: GroupMemberPreferencesDto;
}
