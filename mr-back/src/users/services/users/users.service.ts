import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto, UserExistsDto, LoginUserDto, UpdateUserDto, UsersPassUpdateDto } from 'src/users/users.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({...createUserDto, currLogin: new Date()});
    return this.userRepository.save(newUser);
  }
  
  getUsers() {
    return this.userRepository.find();
  }

  async findUserExists(userExistsDto: UserExistsDto) {
    const user = await this.userRepository.findOne({where: {email: userExistsDto.email}})
    return user !== null;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email: email}})
    return user;
  }

  async updateUserLastLogin(email: string) {
    const user = await this.userRepository.findOne({where: {email: email}})
    if(user.currLogin){
      user.lastLogIn = user.currLogin;
    }
    user.currLogin = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async usersUpdate(usr: User, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.findOne({where: {id: usr.id}})
    .catch((er)=>{
      throw new NotFoundException();
    });
    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    await this.userRepository.save(user).catch((er) =>{
      throw new ForbiddenException();
    });
    return true;
  }

  async usersPassUpdate(usr: User, usersPassUpdateDto: UsersPassUpdateDto){
    const user = await this.userRepository.findOne({where: {id: usr.id}})
    .catch((er)=>{
      throw new NotFoundException();
    });
    if(user.password === usersPassUpdateDto.password){
      user.password = usersPassUpdateDto.newPassword;
    }else{
      throw new UnauthorizedException();
    }
    await this.userRepository.save(user).catch((er) =>{
      throw new ForbiddenException();
    });
    return true;
  }
}