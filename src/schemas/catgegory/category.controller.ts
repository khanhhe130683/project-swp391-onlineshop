import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CATEGORY_SWAGGER_RESPONSE } from './category.constant';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './create-category.dto';
import { PRODUCT_SWAGGER_RESPONSE } from '../product/product.constant';
import { QueryParamDto } from 'src/shared/dto/query-params.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({
    description: 'Category',
    type: CreateCategoryDto,
  })
  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Get()
  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public getList(@Query() query: QueryParamDto) {
    const condition = { isDeleted: false };
    if (query.search) {
      condition['name'] = new RegExp(query.search, 'i');
    }
    return this.categoryService.getAll(condition, query);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id of category',
  })
  @ApiOkResponse(PRODUCT_SWAGGER_RESPONSE.GET_PRODUCT_SUCCESS)
  @ApiBadRequestResponse(PRODUCT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get(':id')
  async getById(@Param('id') id) {
    return this.categoryService.getById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public update(@Param('id') id, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  public delete(@Param('id') id) {
    return this.categoryService.delete(id);
  }
}
