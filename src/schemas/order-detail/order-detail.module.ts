import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './order-detail.schema';
import { OrderDetailService } from './order-detail.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderDetail.name, schema: OrderDetailSchema }])],
  providers: [OrderDetailService],
  exports: [OrderDetailService, MongooseModule],
})
export class OrderDetailModule {}
