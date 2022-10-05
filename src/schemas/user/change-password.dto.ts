import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'old_password',
    example: 'abc',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'new_password',
    example: 'abcd',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: 'confirm_password',
    example: 'abcd',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
