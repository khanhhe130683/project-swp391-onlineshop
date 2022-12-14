import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'abc',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'full_name',
    example: 'Truong Quoc Khanh',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'age',
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'phone number',
    example: '+84379416224',
  })
  @IsNotEmpty()
  @IsPhoneNumber('VI')
  phoneNumber: string;

  @ApiProperty({
    description: 'address',
    example: 'Ha Noi',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'full_name',
    example: 'Truong Quoc Khanh',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'age',
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiPropertyOptional({
    description: 'phone number',
    example: '+84379416224',
  })
  @IsOptional()
  @IsPhoneNumber('VI')
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'address',
    example: 'Ha Noi',
  })
  @IsOptional()
  @IsString()
  address: string;
}
