import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NearbyRequestDto } from 'src/dto/nearby-request.dto';
export class CreateGroupDto {
  constructor(
    groupName: string,
    groupIconID: number,
    groupAdminEmail: string,
    groupMembersEmails: string[],
    votingDeadline: number,
    isActive: boolean,
    adminPreferences: NearbyRequestDto,
  ) {
    this.groupName = groupName;
    this.groupIconID = groupIconID;
    this.groupAdminEmail = groupAdminEmail;
    this.groupMembersEmails = groupMembersEmails;
    this.votingDeadline = votingDeadline;
    this.isActive = isActive;
    this.adminPreferences = adminPreferences;
  }

  @ApiProperty()
  groupName: string;
  @ApiProperty()
  groupIconID: number;
  @ApiProperty()
  groupAdminEmail: string;
  @ApiProperty()
  groupMembersEmails: string[];
  @ApiProperty()
  votingDeadline: number;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  adminPreferences: NearbyRequestDto;
}
