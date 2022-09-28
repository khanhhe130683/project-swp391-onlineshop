import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNumber, ValidateNested } from 'class-validator';

export class CreateListProductDto {
  @IsMongoId()
  product: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateListProductDto)
  products: CreateListProductDto[];
}
