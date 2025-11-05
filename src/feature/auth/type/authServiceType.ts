import type { CredentialType, OtpPurpose } from "./authEnum";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  date_joined: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RegisterResponse {
  message: string,
  user: UserResponse,
}

export interface LoginRequest {
  credential: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface OtpServiceRequest {
  credential: string;
  credential_type: CredentialType;
  purpose: OtpPurpose;
}

export interface VerifyOtpServiceRequest {
  otp: string;
  purpose: OtpPurpose;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface OtpServiceResponse {
  success: boolean;
  message: string;
  email_sent: boolean;
  expires_in_minutes: number;
}

export interface VerifyOtpServiceResponse {
  success: boolean;
  token: string;
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface OtpSession {
  credential: string;
  credential_type: CredentialType;
  purpose: OtpPurpose;
  token: string;
}
