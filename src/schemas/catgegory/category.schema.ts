import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdBy: string;

  @Prop({ default: null })
  updatedBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
