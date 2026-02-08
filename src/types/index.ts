import type { AxiosRequestConfig } from "axios";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  full_name?: string;
  role: "admin" | "studio" | "user";
  plan: "free" | "pro" | "enterprise";
  availableCredits: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStatus {
  type: "success" | "error";
  data: any;
}

export interface IUserCreds {
  email: string;
  password: string;
}

export interface AuthOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
}

export interface NoAuthOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
}