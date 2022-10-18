import { ApiProperty } from '@nestjs/swagger';
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
  @IsString()
  age: string;

  @ApiProperty({
    description: 'phone number',
    example: '0379416224',
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
