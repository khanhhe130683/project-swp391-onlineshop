import { BadRequestException, HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as sgMail from '@sendgrid/mail';
import { generate } from 'generate-password';
import { QueryParamDto } from '../../shared/dto/query-params.dto';
import pagination from '../../shared/helper/pagination';
import { ChangePasswordDto } from './change-password.dto';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';
import { DEFAULT_ADMIN_USER } from './user.constant';
import { sendGridConfig } from '../../config/config.constants';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    const userListFound = await this.userModel.find();
    if (!userListFound.length) {
      await this.userModel.create({
        email: DEFAULT_ADMIN_USER.email,
        password: await bcrypt.hash(DEFAULT_ADMIN_USER.password, 10),
        name: DEFAULT_ADMIN_USER.name,
      });
    }
  }

  async changePassword(id: string, data: ChangePasswordDto) {
    const hashPassword = await bcrypt.hash(data.newPassword, 10);
    return this.userModel.updateOne({ _id: id }, { password: hashPassword });
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(data);
    if (!createdUser) {
      throw new HttpException('Register fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdUser;
  }

  async getAll(condition: any, search: any, query: QueryParamDto) {
    const { limit, skip } = pagination(query.page, query.pageSize);
    const sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder == 'desc' ? -1 : 1;
    } else {
      sort['createdAt'] = -1;
    }
    const total = await this.userModel.countDocuments({ isActive: true });
    const totalPage = total % limit == 0 ? total / limit : Math.floor(total / limit) + 1;
    const data = await this.userModel
      .aggregate([
        {
          $match: {
            ...condition,
            $or: [{ name: new RegExp(search.key, 'i') }, { email: new RegExp(search.key, 'i') }],
          },
        },
        { $sort: sort },
      ])
      .skip(skip)
      .limit(limit);
    return {
      data,
      total,
      totalPage,
      pageSize: limit,
      page: Number(query.page),
    };
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

  async delete(id: string) {
    return this.userModel.updateOne({ _id: id }, { isActive: false });
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }

    let password = generate({
      length: 12,
      numbers: true,
    });
    const sendPassword = password;
    password = await bcrypt.hash(password, 10);
    try {
      await this.userModel.updateOne({ _id: user._id }, { password });
      await this.sendEmail(sendPassword, email);
      return {
        success: true,
      };
    } catch (error) {
      return error;
    }
  }

  async sendEmail(password: string, email: string) {
    const key = sendGridConfig.sendGridApiKey;
    try {
      sgMail.setApiKey(key);
      const msg = {
        to: email,
        from: sendGridConfig.sesSendFrom,
        subject: sendGridConfig.subjectMail,
        html: `<strong>
        Username: ${email},
        <br/>
        password: <span style="color: blue;">${password}</span/>
      </strong>`,
      };
      await sgMail.send(msg);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
