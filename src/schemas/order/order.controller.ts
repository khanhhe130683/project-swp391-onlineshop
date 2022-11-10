<<<<<<< HEAD
import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ORDERCODE } from 'src/shared/constants/common.constant';
import { GetUser } from 'src/shared/decorator/get-user.decorator';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import generateOrderCode from 'src/shared/helper/orderCode';
=======
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ORDERCODE } from '../../shared/constants/common.constant';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { QueryParamDto } from '../../shared/dto/query-params.dto';
import generateOrderCode from '../../shared/helper/orderCode';
>>>>>>> khanhtq
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './create-order.dto';
import { ORDER_SWAGGER_RESPONSE } from './order.constant';
import { OrderService } from './order.service';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

<<<<<<< HEAD
=======
  @ApiBody({
    description: 'Order',
    type: CreateOrderDto,
  })
>>>>>>> khanhtq
  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
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
<<<<<<< HEAD
        await this.orderService.delete(orderCreated._id);
=======
        await this.orderService.hardDelete(orderCreated._id);
>>>>>>> khanhtq
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

  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get()
<<<<<<< HEAD
  async getAll(@Query() query: QueryParamDto, @GetUser() user) {
=======
  async getAllByUser(@Query() query: QueryParamDto, @GetUser() user) {
>>>>>>> khanhtq
    const condition = {
      isDeleted: false,
      user: new mongoose.Types.ObjectId(user._id),
    };
    const search = {};
    if (query.search) {
      search['key'] = query.search;
    }
    return this.orderService.getAll(condition, search, query);
  }

<<<<<<< HEAD
=======
  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get('list')
  async getAll(@Query() query: QueryParamDto) {
    const condition = {
      isDeleted: false,
    };
    const search = {};
    if (query.search) {
      search['key'] = query.search;
    }
    return this.orderService.getAll(condition, search, query);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of order',
  })
>>>>>>> khanhtq
  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.GET_ORDER_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get(':id')
  async getOne(@GetUser() user, @Param('id') id) {
    const condition = {
<<<<<<< HEAD
      _id: id,
      user: user._id,
=======
      _id: new mongoose.Types.ObjectId(id),
      user: new mongoose.Types.ObjectId(user._id),
>>>>>>> khanhtq
    };
    return this.orderService.getOne(condition);
  }

<<<<<<< HEAD
  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Patch('delete/:id')
=======
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of order',
  })
  @ApiOkResponse(ORDER_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(ORDER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Delete(':id')
>>>>>>> khanhtq
  async delete(@Param('id') id) {
    return this.orderService.delete(id);
  }
}
