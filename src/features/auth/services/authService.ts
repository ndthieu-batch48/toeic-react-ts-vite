import { axiosBase } from '@/lib/axios';
import type { LoginRequest, AuthUserResponse, RegisterRequest, OtpRequest, OtpVerifyRequest, ResetPassswordRequest } from '../types/authUser';

export const login = async (request: LoginRequest): Promise<AuthUserResponse> => {
  const url = `/auth/login`;
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const register = async (request: RegisterRequest) => {
  const url = '/auth/register';
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const refreshTokenService = async (refreshToken: string) => {
  const url = '/auth/refresh-token';
  const response = await axiosBase.post(url, { token: refreshToken });
  return response.data;
};

export const sendOtpRequest = async (request: OtpRequest) => {
  const url = '/auth/otp/request';
  const response = await axiosBase.post(url, request);
  return response.data;
};

export const verifyOtpRequest = async (request: OtpVerifyRequest) => {
  const url = '/auth/otp/verify';
  const res = await axiosBase.post(url, request);
  return res.data;
};

export const resetPassword = async (request: ResetPassswordRequest) => {
  const url = '/auth/reset-password';
  const res = await axiosBase.put(url, request);
  return res.data;
};

