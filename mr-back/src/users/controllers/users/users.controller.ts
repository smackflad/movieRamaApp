import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto, UserExistsDto } from 'src/users/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  
  @Get(':id')
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUsersById(id);
  }
  
  @Post('create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('exists')
  @UsePipes(ValidationPipe)
  findUserExists(@Body() userExistsDto: UserExistsDto) {
      return this.userService.findUserExists(userExistsDto);
  }
}