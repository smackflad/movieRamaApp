import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto, UserExistsDto, LoginUserDto } from 'src/users/users.dtos';
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
}