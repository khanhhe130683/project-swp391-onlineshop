import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateListProductDto {
  @ApiProperty({
    description: 'product_id',
    example: '63282af9bec5fb726c7a8630',
  })
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'number of products',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'list products',
    example: '63282af9bec5fb726c7a8630',
  })
  @IsArray()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateListProductDto)
  products: CreateListProductDto[];
}
