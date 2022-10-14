import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base-schema';
import { User } from '../user/user.schema';
import { Comment } from '../comment/comment.schema';

export type ReplyCommentDocument = ReplyComment & Document;

@Schema({ timestamps: true })
export class ReplyComment extends BaseSchema {
  @Prop()
  content: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comment: Comment;
}

export const ReplyCommentSchema = SchemaFactory.createForClass(ReplyComment);
