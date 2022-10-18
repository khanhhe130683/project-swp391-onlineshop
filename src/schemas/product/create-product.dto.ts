import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'category_id',
    example: '631b05a76591da678480d09f',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'name',
    example: 'Vong co',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'Vong co',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'product_code',
    example: 'VCO',
  })
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @ApiProperty({
    description: 'import_price',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumberString()
  importPrice: number;

  @ApiProperty({
    description: 'sale_price',
    example: 25,
  })
  @IsNotEmpty()
  @IsNumberString()
  salePrice: number;

  @ApiProperty({
    description: 'inventory quantity',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumberString()
  actualQuantity: number;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  images: any[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'category_id',
    example: '631b05a76591da678480d09f',
  })
  @IsOptional()
  @IsMongoId()
  category: string;

  @ApiPropertyOptional({
    description: 'name',
    example: 'Vong co',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'description',
    example: 'Vong co',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'product_code',
    example: 'VCO',
  })
  @IsOptional()
  @IsString()
  productCode: string;

  @ApiPropertyOptional({
    description: 'import_price',
    example: 20,
  })
  @IsOptional()
  @IsNumberString()
  importPrice: number;

  @ApiPropertyOptional({
    description: 'sale_price',
    example: 25,
  })
  @IsOptional()
  @IsNumberString()
  salePrice: number;

  @ApiPropertyOptional({
    description: 'inventory quantity',
    example: 20,
  })
  @IsOptional()
  @IsNumberString()
  actualQuantity: number;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  images: any[];
}
