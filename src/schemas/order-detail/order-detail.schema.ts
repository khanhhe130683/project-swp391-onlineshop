import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';
import { Order } from '../order/order.schema';
import { Product } from '../product/Product.schema';

export type OrderDetailDocument = OrderDetail & Document;

@Schema({ timestamps: true })
export class OrderDetail extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
