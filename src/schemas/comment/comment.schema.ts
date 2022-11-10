import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';
import { User } from '../user/user.schema';
import { Product } from '../product/Product.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment extends BaseSchema {
  @Prop()
  content: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
