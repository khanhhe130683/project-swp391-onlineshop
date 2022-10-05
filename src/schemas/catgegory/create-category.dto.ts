import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category_name',
    example: 'Day chuyen',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'category_slug',
    example: 'day-chuyen',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;
}
