import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReplyCommentDto {
  @ApiProperty({
    description: 'comment content',
    example: 'Hay',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'id of comment',
    example: 'Hay qua',
  })
  @IsNotEmpty()
  @IsMongoId()
  comment: string;
}

export class UpdateReplyCommentDto {
  @ApiProperty({
    description: 'comment content',
    example: 'Hay',
  })
  @IsOptional()
  @IsString()
  content: string;
}
