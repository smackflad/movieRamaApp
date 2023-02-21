import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private usersService: UsersService) {}

  async signPayload(payload: any) {
    const user = await this.usersService.findUserByEmail(payload.email)
    if(user.password === payload.password){
        await this.usersService.updateUserLastLogin(payload.email);
        const accessToken = this.jwtService.sign(payload);
        return {
          expiresIn: 3600,
          accessToken,
        };
    }else{
        throw new UnauthorizedException('Email/password dosent match');
    }
    return null;
  }

  async validateUser(email: string, pass: string) {
    console.log("test")
    const user = await this.usersService.findUserByEmail(email)
    if(user.password === pass){
        const { password, ...res } = user;
        return res;
    }else{
        throw new UnauthorizedException('Email/password dosent match');
    }
    return null;
  }
}
