import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async create(data: any) {
    const createdCategory = await this.commentModel.create(data);
    return createdCategory;
  }

  async getAll(productId: string): Promise<CommentDocument[]> {
    return this.commentModel.aggregate([
      {
        $match: { isDeleted: false, product: new mongoose.Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'replycomments',
          localField: '_id',
          foreignField: 'comment',
          as: 'reply_comment',
        },
      },
    ]);
  }

  async update(id: string, dataUpdate: any) {
    return this.commentModel.updateOne({ _id: id }, dataUpdate);
  }

  async delete(id: string) {
    return this.commentModel.updateOne({ _id: id }, { isDeleted: true });
  }
}
