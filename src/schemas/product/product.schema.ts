import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base-schema';
import { Category } from '../catgegory/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop()
  productCode: string;

  @Prop()
  importPrice: number;

  @Prop()
  salePrice: number;

  @Prop()
  allowedQuantity: number;

  @Prop()
  actualQuantity: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
