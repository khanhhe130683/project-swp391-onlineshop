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

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Get()
  async getAll(@Query() query: QueryParamDto) {
    const condition = { isActive: true };
    if (query.search) {
      condition['name'] = query.search;
    }
    return this.productService.getAll(condition, query);
  }

  @Get('id')
  async getById(@Param('id') id) {
    return this.productService.getById(id);
  }

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
