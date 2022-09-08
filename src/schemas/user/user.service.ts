import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createdUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createdUserDto);
    return createdUser;
  }

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, dataUpdate: object) {
    return this.userModel.updateOne({ _id: id }, dataUpdate);
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
