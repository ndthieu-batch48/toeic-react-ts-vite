import { mutationOptions } from '@tanstack/react-query';
import { axiosBase } from '@/lib/axios';
import type {
  LoginRequest,
  UserResponse,
  RegisterRequest,
  RegisterResponse,
  OtpServiceRequest,
  VerifyOtpServiceRequest,
  ResetPasswordRequest,
  OtpServiceResponse,
  VerifyOtpServiceResponse,
  ResetPasswordResponse,

} from '../type/authServiceType';

// ========== Services ==========
const authService = {
  login: async (request: LoginRequest): Promise<UserResponse> => {
    const url = 'auth/login';
    const response = await axiosBase.post(url, request);
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<RegisterResponse> => {
    const url = 'auth/register';
    const response = await axiosBase.post(url, request);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const url = 'auth/refresh-token';
    const response = await axiosBase.post(url, { token: refreshToken });
    return response.data;
  },

  sendOtp: async (request: OtpServiceRequest): Promise<OtpServiceResponse> => {
    const url = 'auth/password/otp';
    const response = await axiosBase.post(url, request);
    return response.data;
  },

  verifyOtp: async (request: VerifyOtpServiceRequest): Promise<VerifyOtpServiceResponse> => {
    const url = 'auth/password/otp/verify';
    const res = await axiosBase.post(url, request);
    return res.data;
  },

  resetPassword: async (request: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const url = 'auth/password/reset';
    const res = await axiosBase.put(url, request);
    return res.data;
  },
} as const;

// ========== Mutation Options ==========
const authMutation = {
  login: () => mutationOptions({
    mutationFn: authService.login,
  }),

  register: () => mutationOptions({
    mutationFn: authService.register,
  }),

  sendOtp: () => mutationOptions({
    mutationFn: authService.sendOtp,
  }),

  verifyOtp: () => mutationOptions({
    mutationFn: authService.verifyOtp,
  }),

  resetPassword: () => mutationOptions({
    mutationFn: authService.resetPassword,
  }),
} as const;

export { authService, authMutation };