import { IsString, IsOptional, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';

export class QueryParamDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  pageSize: string;

  @IsString()
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  sortOrder: string;

  @IsString()
  @IsOptional()
  search: string;
}

export class QueryPostDto extends QueryParamDto {
  @IsMongoId()
  @IsOptional()
  category: string;
}

export class ParamIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
