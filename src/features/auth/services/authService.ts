import { axiosBase } from '@/lib/axios';
import type { LoginRequest, UserResponse, RegisterRequest, RegisterResponse, OtpRequest, OtpVerifyRequest, ResetPassswordRequest } from '../types/authType';

export const login = async (request: LoginRequest): Promise<UserResponse> => {
  const url = 'auth/login';
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
  const url = 'auth/register';
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const refreshTokenService = async (refreshToken: string) => {
  const url = 'auth/refresh-token';
  const response = await axiosBase.post(url, { token: refreshToken });
  return response.data;
};

export const sendOtpRequest = async (request: OtpRequest) => {
  const url = 'auth/otp/request';
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const verifyOtpRequest = async (request: OtpVerifyRequest) => {
  const url = 'auth/otp/verify';
  const res = await axiosBase.post(url, request);
  return res.data;
};

export const resetPassword = async (request: ResetPassswordRequest) => {
  const url = 'auth/reset-password';
  const res = await axiosBase.put(url, request);
  return res.data;
};

