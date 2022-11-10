import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'comment content',
    example: 'Hay',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'id of product',
    example: '6336a105f4a518801048b606',
  })
  @IsNotEmpty()
  @IsMongoId()
  product: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'comment content',
    example: 'Hay',
  })
  @IsOptional()
  @IsString()
  content: string;
}
