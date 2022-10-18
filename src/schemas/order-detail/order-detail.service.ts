import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetail, OrderDetailDocument } from './order-detail.schema';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel(OrderDetail.name)
    private orderDetailModel: Model<OrderDetailDocument>,
  ) {}

  async create(data: object): Promise<OrderDetailDocument> {
    const orderDetailCreated = await this.orderDetailModel.create(data);
    return orderDetailCreated;
  }
}
