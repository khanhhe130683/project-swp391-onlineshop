import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsMongoId()
  category: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  productCode: string;

  @IsNumber()
  importPrice: number;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  actualQuantity: number;
}
