import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './create-product.dto';
import { QueryPostDto } from '../../shared/dto/query-params.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../shared/helper/multer.option';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { PRODUCT_SWAGGER_RESPONSE } from './product.constant';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../../shared/decorator/roles.decorator';
import { Role } from '../../shared/constants/common.constant';

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBody({
    description: 'Product',
    type: CreateProductDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, multerOptions))
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: CreateProductDto) {
    const images = files.map((file) => {
      return file.path;
    });

    const dataCreate = {
      ...body,
      images,
    };
    const createdCategory = await this.productService.create(dataCreate);
    if (!createdCategory) {
      throw new HttpException('Create fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdCategory;
  }

  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get()
  async getAll(@Query() query: QueryPostDto) {
    const condition = { isDeleted: false };
    if (query.search) {
      condition['name'] = new RegExp(query.search, 'i');
    }
    if (query.category) {
      condition['category'] = new mongoose.Types.ObjectId(query.category);
    }
    if (query.minPrice && query.maxPrice) {
      condition['salePrice'] = { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) };
    } else if (query.maxPrice) {
      condition['salePrice'] = { $lte: Number(query.maxPrice) };
    } else if (query.minPrice) {
      condition['salePrice'] = { $gte: Number(query.minPrice) };
    }
    return this.productService.getAll(condition, query);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of product',
  })
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.GET_PRODUCT_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get(':id')
  async getById(@Param('id') id) {
    return this.productService.getById(id);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of product',
  })
  @ApiBody({
    description: 'Product',
    type: UpdateProductDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 3, multerOptions))
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Body() body: UpdateProductDto, @Param('id') id, @GetUser() user) {
    const dataUpdate = {
      ...body,
      updatedBy: user._id,
    };
    return this.productService.update(id, dataUpdate);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of product',
  })
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.productService.delete(id);
  }
}
