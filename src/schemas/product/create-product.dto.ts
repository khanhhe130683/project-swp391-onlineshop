import { IsArray, IsMongoId, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsNumberString()
  importPrice: number;

  @IsNotEmpty()
  @IsNumberString()
  salePrice: number;

  @IsNotEmpty()
  @IsNumberString()
  actualQuantity: number;
}

export class CreateProductImageDto {
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  images: string[];

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsNumberString()
  importPrice: number;

  @IsNotEmpty()
  @IsNumberString()
  salePrice: number;

  @IsNotEmpty()
  @IsNumberString()
  actualQuantity: number;
}
