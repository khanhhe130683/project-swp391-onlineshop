import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CATEGORY_SWAGGER_RESPONSE } from './category.constant';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categroyService: CategoryService) {}

  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Post()
  async create(@Body() body: CreateCategoryDto) {
    const createdCategory = await this.categroyService.create(body);
    if (!createdCategory) {
      throw new HttpException('Create fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdCategory;
  }

  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Get()
  async getAll() {
    return this.categroyService.getAll();
  }

  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() body) {
    const dataUpdate = {
      ...body,
      updatedBy: id,
    };
    return this.categroyService.update(id, dataUpdate);
  }

  @ApiOkResponse(CATEGORY_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @ApiBadRequestResponse(CATEGORY_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @Patch('delete/:id')
  async delete(@Param('id') id) {
    return this.categroyService.delete(id);
  }
}
