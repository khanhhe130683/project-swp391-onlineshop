import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
<<<<<<< HEAD
import { BaseSchema } from 'src/shared/schemas/base-schema';
=======
import { BaseSchema } from '../../shared/schemas/base-schema';
>>>>>>> khanhtq

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
