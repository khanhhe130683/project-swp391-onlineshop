import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import pagination from 'src/shared/helper/pagination';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async create(createdUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createdUserDto);
    if (!createdUser) {
      throw new HttpException('Register fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdUser;
  }

  async getAll(condition: any, search, query: QueryParamDto): Promise<UserDocument[]> {
    const { limit, skip } = pagination(query.page, query.pageSize);
    const sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder == 'desc' ? -1 : 1;
    } else {
      sort['createdAt'] = 1;
    }
    return this.userModel.aggregate([
      {
        $match: {
          ...condition,
          $or: [{ name: new RegExp(search.key) }, { email: new RegExp(search.key) }],
        },
      },
      { $limit: limit },
      { $skip: skip },
      { $sort: sort },
    ]);
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
