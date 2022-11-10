import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
<<<<<<< HEAD
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import pagination from 'src/shared/helper/pagination';
=======
import { QueryPostDto } from '../../shared/dto/query-params.dto';
import pagination from '../../shared/helper/pagination';
>>>>>>> khanhtq
import { CreateProductDto } from './create-product.dto';
import { Product, ProductDocument } from './Product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createdProductDto: CreateProductDto): Promise<ProductDocument> {
    const createProductData = {
      ...createdProductDto,
      allowedQuantity: createdProductDto.actualQuantity,
    };
    const createdProduct = await this.productModel.create(createProductData);
    return createdProduct;
  }

<<<<<<< HEAD
  async getAll(condition: any, query: QueryParamDto): Promise<ProductDocument[]> {
=======
  async getAll(condition: any, query: QueryPostDto) {
>>>>>>> khanhtq
    const { limit, skip } = pagination(query.page, query.pageSize);
    const sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder == 'desc' ? -1 : 1;
<<<<<<< HEAD
    }
    return this.productModel.aggregate([{ $match: condition }, { $limit: limit }, { $skip: skip }, { $sort: sort }]);
  }

  async getById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
=======
    } else {
      sort['createdAt'] = -1;
    }
    const total = await this.productModel.countDocuments({ isDeleted: true });
    const totalPage = total % limit == 0 ? total / limit : Math.floor(total / limit) + 1;
    const data = await this.productModel
      .aggregate([
        { $match: condition },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $sort: sort },
      ])
      .skip(skip)
      .limit(limit);
    return {
      data,
      total,
      totalPage,
      pageSize: limit,
      page: Number(query.page),
    };
  }

  async getById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id);
>>>>>>> khanhtq
  }

  async getByIds(ids: string[]): Promise<ProductDocument[]> {
    return this.productModel.find({ _id: { $in: ids } });
  }

<<<<<<< HEAD
  async update(id: string, dataUpdate: object) {
    return this.productModel.updateOne({ _id: id }, dataUpdate);
  }
=======
  async update(id: string, dataUpdate: any) {
    return this.productModel.updateOne({ _id: id }, dataUpdate);
  }

  async delete(id: string) {
    return this.productModel.updateOne({ _id: id }, { isDeleted: true });
  }
>>>>>>> khanhtq
}
