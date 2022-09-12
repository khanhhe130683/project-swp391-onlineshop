import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Product } from '../product/product.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private productModel: Model<CategoryDocument>,
  ) { }

  async create(createdCategoryDto: CreateCategoryDto): Promise<CategoryDocument> {
    const createdCategory = await this.categoryModel.create(createdCategoryDto);
    return createdCategory;
  }

  async getAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().exec();
  }

  async update(id: string, dataUpdate: object) {
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
