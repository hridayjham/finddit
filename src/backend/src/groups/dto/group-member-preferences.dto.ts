import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class GroupMemberPreferencesDto {
  @ApiProperty()
  maxPrice: number;
  @ApiProperty()
  minPrice: number;
  @ApiProperty()
  travelRadius: number;
}
