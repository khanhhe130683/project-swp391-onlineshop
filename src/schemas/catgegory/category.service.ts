import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Product, ProductDocument } from '../product/product.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './create-category.dto';
import { CATEGORY_REPONE } from './category.constant';
import { QueryParamDto } from '../../shared/dto/query-params.dto';
import pagination from '../../shared/helper/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(body: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({ $or: [{ slug: body.slug }, { name: body.name }] });
    if (category) {
      throw new BadRequestException(CATEGORY_REPONE.SLUG_EXISTED);
    }
    const createdCategory = await this.categoryModel.create(body);
    return createdCategory;
  }

  async getAll(condition: any, query: QueryParamDto) {
    const { limit, skip } = pagination(query.page, query.pageSize);
    const sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder == 'desc' ? -1 : 1;
    } else {
      sort['createdAt'] = -1;
    }
    const total = await this.categoryModel.countDocuments({ isDeleted: true });
    const totalPage = total % limit == 0 ? total / limit : Math.floor(total / limit) + 1;
    const data = await this.categoryModel
      .aggregate([{ $match: condition }, { $sort: sort }])
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

  async update(id: string, dataUpdate: any) {
    const category = await this.categoryModel.findOne({
      $or: [{ slug: dataUpdate.slug }, { name: dataUpdate.name }],
    });
    if (category) {
      throw new BadRequestException(CATEGORY_REPONE.SLUG_EXISTED);
    }
    return this.categoryModel.updateOne({ _id: id }, dataUpdate);
  }

  async getById(id: string): Promise<ProductDocument> {
    return this.categoryModel.findById(id);
  }

  async delete(id: string) {
    const checkCategory = await this.productModel.findOne({ category: id });
    if (checkCategory) {
      throw new HttpException('The category contains products. Cannot delete', HttpStatus.BAD_REQUEST);
    }
    return this.categoryModel.updateOne({ _id: id }, { isDeleted: true });
  }

  findAll() {
    return {
      data: [
        {
          _id: '634cf5ac2f0e57f6dcda22a7',
          updatedBy: null,
          name: 'Dong ho',
          slug: 'dong-ho',
          isDeleted: false,
          createdAt: '2022-10-17T06:26:52.691Z',
          updatedAt: '2022-10-17T06:26:52.691Z',
          __v: 0,
        },
      ],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    };
  }
}
