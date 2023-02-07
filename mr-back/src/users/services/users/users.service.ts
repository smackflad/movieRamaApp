import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto, UserExistsDto } from 'src/users/users.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  async findUserExists(userExistsDto: UserExistsDto) {
    const user = await this.userRepository.findOne({where: {email: userExistsDto.email}})
    return user !== null;
  }
}