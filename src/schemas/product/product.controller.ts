import {
  Body,
  Controller,
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
import { CreateProductDto } from './create-product.dto';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/helper/multer.option';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PRODUCT_SWAGGER_RESPONSE } from './product.constant';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 3, multerOptions))
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
    const condition = { isActive: true };
    if (query.search) {
      condition['name'] = query.search;
    }
    return this.productService.getAll(condition, query);
  }

  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.GET_PRODUCT_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get('id')
  async getById(@Param('id') id) {
    return this.productService.getById(id);
  }

  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() body) {
    const dataUpdate = {
      ...body,
      updatedBy: id,
    };
    return this.productService.update(id, dataUpdate);
  }
}
