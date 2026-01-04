// types/auth.types.ts

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  expiresAt: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}
