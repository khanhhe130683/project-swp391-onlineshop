import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) { }

  async create(data: object): Promise<OrderDocument> {
    const orderCreated = await this.orderModel.create(data);
    return orderCreated;
  }

  async delete(id: string) {
    return this.orderModel.deleteOne({ _id: id });
  }
}
