import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/config.constants';
import { UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    if (user && user.password === password) {
      user.password = null;
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, _id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
