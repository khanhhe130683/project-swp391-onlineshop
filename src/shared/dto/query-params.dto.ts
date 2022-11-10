import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEnum, IsMongoId, IsNumberString } from 'class-validator';

export class QueryParamDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  page: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pageSize: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  sortOrder: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;
}

export class QueryPostDto extends QueryParamDto {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  category: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  minPrice: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  maxPrice: string;
}

export class ParamIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
