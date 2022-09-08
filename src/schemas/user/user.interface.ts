export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  age: number;
  address: string;
  phoneNumber: number;
}

export interface IUpdateUser {
  name?: string;
  age?: number;
  address?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
