import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categroyService: CategoryService) {}
}
