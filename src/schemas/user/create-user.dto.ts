import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;
}
