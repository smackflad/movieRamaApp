import { UseGuards, Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { AuthService } from 'src/users/services/users/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserExistsDto, UsersPassUpdateDto } from 'src/users/users.dtos';
import { AuthGuard } from '@nestjs/passport';
import { SELF_DECLARED_DEPS_METADATA } from '@nestjs/common/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService,
    private readonly authService: AuthService) {}
  
  @Get()
  getUsers() {
    return this.userService.getUsers();
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
  @Get('validate')
  validate(@Request() req) {
    return req.user;
  }

  @Post('exists')
  @UsePipes(ValidationPipe)
  findUserExists(@Body() userExistsDto: UserExistsDto) {
      return this.userService.findUserExists(userExistsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  usersUpdate(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.usersUpdate(req.user, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('updatePassword')
  usersPassUpdate(@Request() req, @Body() usersPassUpdateDto: UsersPassUpdateDto) {
    return this.userService.usersPassUpdate(req.user, usersPassUpdateDto);
  }

}