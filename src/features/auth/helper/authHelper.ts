import type { OtpSession, UserResponse } from '../types/authType';
import { getStorageJSON, removeStorageItem, setStorageJSON } from "@/utils/localStorageUtil";

export const STORAGE_KEYS = {
  USER: 'user_session',
  OTP_SERVICE_SESSION: 'otp_session',
};

export const getUserSession = (): UserResponse | null => getStorageJSON<UserResponse | null>(STORAGE_KEYS.USER, null);
export const saveUserSession = (user: UserResponse): boolean => setStorageJSON(STORAGE_KEYS.USER, user);
export const clearUserSession = (): boolean => removeStorageItem(STORAGE_KEYS.USER);

// OTP Session functions
export const createOtpSession = (session: Partial<OtpSession>): boolean => {
  const otpSession: OtpSession = {
    credential_value: session.credential_value || '',
    credential_type: session.credential_type || '',
    purpose: session.purpose || '',
    token: session.token || '',
  };

  return setStorageJSON(STORAGE_KEYS.OTP_SERVICE_SESSION, otpSession);
};

export const getOtpSession = (): OtpSession => {
  return getStorageJSON<OtpSession>(STORAGE_KEYS.OTP_SERVICE_SESSION, {
    credential_value: '',
    credential_type: '',
    purpose: '',
    token: '',
  });
};

export const updateOtpSession = (updates: Partial<OtpSession>): boolean => {
  const currentSession = getOtpSession();
  const updatedSession = {
    ...currentSession,
    ...updates,
  };

  return setStorageJSON(STORAGE_KEYS.OTP_SERVICE_SESSION, updatedSession);
};

export const clearOtpSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.OTP_SERVICE_SESSION);
};