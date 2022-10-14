import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'category_name',
    example: 'Day chuyen',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'category_slug',
    example: 'day-chuyen',
  })
  @IsOptional()
  @IsString()
  slug: string;
}
