import { UseGuards, Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { AuthService } from 'src/users/services/users/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto, LoginUserDto, UserExistsDto } from 'src/users/users.dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService,
    private readonly authService: AuthService) {}
  
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

  @Post('login')
  login(@Body() payload) {
    return this.authService.signPayload(payload);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post('validate')
  validate(@Request() req) {
    return req.user;
  }

  @Post('exists')
  @UsePipes(ValidationPipe)
  findUserExists(@Body() userExistsDto: UserExistsDto) {
      return this.userService.findUserExists(userExistsDto);
  }
}