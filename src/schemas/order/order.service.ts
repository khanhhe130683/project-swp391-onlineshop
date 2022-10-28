import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryParamDto } from '../../shared/dto/query-params.dto';
import pagination from '../../shared/helper/pagination';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(data: object): Promise<OrderDocument> {
    const orderCreated = await this.orderModel.create(data);
    return orderCreated;
  }

  async delete(id: string) {
    return this.orderModel.updateOne({ _id: id }, { isDeleted: true });
  }

  async hardDelete(id: string) {
    return this.orderModel.deleteOne({ _id: id });
  }

  async getAll(condition: any, search, query: QueryParamDto): Promise<OrderDocument[]> {
    const { limit, skip } = pagination(query.page, query.pageSize);
    const sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder == 'desc' ? -1 : 1;
    } else {
      sort['createdAt'] = -1;
    }
    return this.orderModel.aggregate([
      {
        $match: {
          ...condition,
          orderCode: new RegExp(search.key),
        },
      },
      {
        $lookup: {
          from: 'orderdetails',
          localField: '_id',
          foreignField: 'order',
          as: 'order_details',
        },
      },
      { $limit: limit },
      { $skip: skip },
      { $sort: sort },
    ]);
  }

  async getOne(condition: any) {
    return this.orderModel.aggregate([
      {
        $match: {
          ...condition,
        },
      },
      {
        $lookup: {
          from: 'orderdetails',
          localField: '_id',
          foreignField: 'order',
          as: 'order_details',
        },
      },
    ]);
  }
}
