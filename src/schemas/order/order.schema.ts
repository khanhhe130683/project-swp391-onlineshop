import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base-schema';
import { User } from '../user/user.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  orderCode: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);