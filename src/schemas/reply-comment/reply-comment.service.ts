import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ReplyComment, ReplyCommentDocument } from './reply-comment.schema';

@Injectable()
export class ReplyCommentService {
  constructor(
    @InjectModel(ReplyComment.name)
    private repCommentModel: Model<ReplyCommentDocument>,
  ) {}

  async create(data: any) {
    const createdCategory = await this.repCommentModel.create(data);
    return createdCategory;
  }

  async getAll(commentId: string): Promise<ReplyCommentDocument[]> {
    return this.repCommentModel.find({ isDeleted: false, comment: new mongoose.Types.ObjectId(commentId) }).exec();
  }

  async update(id: string, dataUpdate: any) {
    return this.repCommentModel.updateOne({ _id: id }, dataUpdate);
  }

  async delete(id: string) {
    return this.repCommentModel.updateOne({ _id: id }, { isDeleted: true });
  }
}
