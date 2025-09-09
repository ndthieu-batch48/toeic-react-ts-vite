
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

export interface OtpRequest {
  credential_value: string;
  credential_type: string;
  purpose: string;
}

export interface OtpVerifyRequest {
  otp: string;
  purpose: string;
}

export interface ResetPassswordRequest {
  token: string;
  new_password: string;
}

export interface OtpSession {
  credential_value: string;
  credential_type: string;
  purpose: string;
  token: string;
}