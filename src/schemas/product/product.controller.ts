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
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './create-product.dto';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/helper/multer.option';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PRODUCT_SWAGGER_RESPONSE } from './product.constant';
import { GetUser } from 'src/shared/decorator/get-user.decorator';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({
    description: 'Product',
    type: CreateProductDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 3, multerOptions))
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: CreateProductDto) {
    const images = files.map((file) => {
      return file.filename;
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
  async getAll(@Query() query: QueryParamDto) {
    const condition = { isDeleted: false };
    if (query.search) {
      condition['name'] = query.search;
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
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateProductDto, @Param('id') id, @GetUser() user) {
    const dataUpdate = {
      ...body,
      updatedBy: user._id,
    };
    return this.productService.update(id, dataUpdate);
  }

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
