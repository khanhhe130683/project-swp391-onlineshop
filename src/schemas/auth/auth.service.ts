import { BadRequestException, Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/config.constants';
=======
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
>>>>>>> khanhtq
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
<<<<<<< HEAD
    if (user && user.password === password) {
      user.password = null;
      return user;
    }
=======
    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      return user;
    }

>>>>>>> khanhtq
    return null;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, _id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
<<<<<<< HEAD
=======

  findAll() {
    return ['1', '2'];
  }
>>>>>>> khanhtq
}
