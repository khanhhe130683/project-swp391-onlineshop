import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { ProductModule } from '../product/product.module';
import { OrderInfoController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderInfoService } from './order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), ProductModule, OrderDetailModule],
  controllers: [OrderInfoController],
  providers: [OrderInfoService],
  exports: [OrderInfoService, MongooseModule],
})
export class OrderInfoModule {}
