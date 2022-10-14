import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Product, ProductDocument } from '../product/product.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './create-category.dto';
import { CATEGORY_REPONE } from './category.constant';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) { }

  async create(body: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({ $or: [{ slug: body.slug }, { name: body.name }] });
    if (category) {
      throw new BadRequestException(CATEGORY_REPONE.SLUG_EXISTED);
    }
    const createdCategory = await this.categoryModel.create(body);
    return createdCategory;
  }

  async getAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ isDeleted: false }).exec();
  }

  async update(id: string, dataUpdate: any) {
    const category = await this.categoryModel.findOne({ $or: [{ slug: dataUpdate.slug }, { name: dataUpdate.name }] });
    if (category) {
      throw new BadRequestException(CATEGORY_REPONE.SLUG_EXISTED);
    }
    return this.categoryModel.updateOne({ _id: id }, dataUpdate);
  }

  async delete(id: string) {
    const checkCategory = await this.productModel.findOne({ category: id });
    if (checkCategory) {
      throw new HttpException('The category contains products. Cannot delete', HttpStatus.BAD_REQUEST);
    }
    return this.categoryModel.updateOne({ _id: id }, { isDeleted: true });
  }
}
