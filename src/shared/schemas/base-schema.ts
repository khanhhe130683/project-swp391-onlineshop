import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  updatedBy: string;
}
