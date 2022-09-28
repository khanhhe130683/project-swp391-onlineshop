import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ORDERCODE } from 'src/shared/constants/common.constant';
import generateOrderCode from 'src/shared/helper/orderCode';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './create-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly orderDetailService: OrderDetailService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateOrderDto, @Req() req) {
    // Sort array by productId
    const listProducts = body.products.sort((a, b) => {
      if (a.product < b.product) {
        return -1;
      }
      if (a.product < b.product) {
        return 1;
      }
      return 0;
    });

    const listProductIds = listProducts.map((product) => {
      return product.product;
    });

    const products = await this.productService.getByIds(listProductIds);

    const orderCode = generateOrderCode(ORDERCODE.CHARACTER, ORDERCODE.LENGTH);
    const dataOrder = {
      user: req.user,
      orderCode,
    };

    const orderCreated = await this.orderService.create(dataOrder);

    const dataOrderDetail = [];
    for (const index in products) {
      if (products[index].allowedQuantity < listProducts[index].quantity) {
        await this.orderService.delete(orderCreated._id);
        throw new BadRequestException('Please choose allowed quantity!');
      }

      const data = {
        order: orderCreated._id,
        product: listProducts[index].product,
        quantity: listProducts[index].quantity,
        price: products[index].salePrice,
      };
      dataOrderDetail.push(data);
    }
    const orderDetailCreated = await this.orderDetailService.create(dataOrderDetail);

    if (orderCreated && orderDetailCreated) {
      for (const orderDetail of dataOrderDetail) {
        const product = await this.productService.getById(orderDetail.product);
        const allowedQuantity = Number(product.allowedQuantity) - Number(orderDetail.quantity);
        await this.productService.update(orderDetail.product, { allowedQuantity });
      }
    }
    return orderCreated;
  }

  // @Get()
  // async getAll() {
  //   const condition = { isActive: true };
  //   if (query.search) {
  //     condition['name'] = query.search;
  //   }
  //   return this.orderService.getAll();
  // }
}
