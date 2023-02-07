import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private usersService: UsersService) {}

  async signPayload(payload: any) {
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email)
    if(user.password === pass){
        const { password, ...res } = user;
        return res;
    }
    return null;
  }
}
