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

  async getAll(productId: any): Promise<CommentDocument[]> {
    const condition = {
      isDeleted: false,
      product: new mongoose.Types.ObjectId(productId),
    };
    return this.commentModel.aggregate([
      {
        $match: condition,
      },
      {
        $lookup: {
          from: 'replycomments',
          localField: '_id',
          foreignField: 'comment',
          as: 'reply_comment',
          pipeline: [
            {
              $match: { isDeleted: false },
            },
          ],
        },
      },
    ]);
  }

  async update(id: string, dataUpdate: any) {
    return this.commentModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, dataUpdate);
  }

  async delete(id: string) {
    return this.commentModel.updateOne({ _id: id }, { isDeleted: true });
  }
}
