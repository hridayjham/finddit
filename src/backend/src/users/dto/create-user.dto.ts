import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    iconID: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.iconID = iconID;
  }
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  iconID: number;
}
