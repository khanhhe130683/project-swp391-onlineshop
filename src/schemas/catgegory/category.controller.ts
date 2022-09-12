import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categroyService: CategoryService) {}

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    const createdCategory = await this.categroyService.create(body);
    if (!createdCategory) {
      throw new HttpException('Create fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdCategory;
  }

  @Get()
  async getAll() {
    return this.categroyService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() body) {
    const dataUpdate = {
      ...body,
      updatedBy: id,
    };
    return this.categroyService.update(id, dataUpdate);
  }

  @Patch('delete/:id')
  async delete(@Param('id') id) {
    return this.categroyService.delete(id);
  }
}
