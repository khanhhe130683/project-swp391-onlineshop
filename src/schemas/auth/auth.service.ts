import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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
    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
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

  findAll() {
    return ['1', '2'];
  }
}
