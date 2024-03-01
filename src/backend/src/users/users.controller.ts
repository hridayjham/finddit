import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserParams: CreateUserDto) {
    console.log(JSON.stringify(createUserParams));
    return this.usersService.create(createUserParams);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email/:email_id')
  findOne(@Param('email_id') email_id: string) {
    return this.usersService.findOne(email_id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.usersService.findByName(name);
  }

  @Get('email-or-name/:email_or_name')
  findByEmailOrName(@Param('email_or_name') email_or_name: string) {
    return this.usersService.findByEmailOrName(email_or_name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete-user/:email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
