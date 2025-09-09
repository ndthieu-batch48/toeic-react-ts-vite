import type { UserResponse } from "@/features/auth/types/user";

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  OTP_SERVICE_SESSION: 'otp_session',
} as const;

// Types
interface TokenPair {
  accessToken: string | null;
  refreshToken: string | null;
}

interface OtpSession {
  credential_value: string;
  credential_type: string;
  purpose: string;
  token: string;
}

/**
 * Safely get item from localStorage
 */
export const getStorageItem = (key: string, defaultValue: string | null = null): string | null => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
  } catch (error) {
    console.error('Storage Utils', `Failed to get ${key}`, error);
    return defaultValue;
  }
};

/**
 * Safely set item to localStorage
 */
export const setStorageItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Storage Utils', `Failed to set ${key}`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 */
export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage Utils', `Failed to remove ${key}`, error);
    return false;
  }
};

/**
 * Get parsed JSON from localStorage
 */
export const getStorageJSON = <T>(key: string, defaultValue: T): T => {
  try {
    const item = getStorageItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage Utils', `Failed to parse JSON for ${key}`, error);
    return defaultValue;
  }
};

/**
 * Set JSON object to localStorage
 */
export const setStorageJSON = <T>(key: string, value: T): boolean => {
  try {
    return setStorageItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage Utils', `Failed to stringify JSON for ${key}`, error);
    return false;
  }
};

// Token-specific storage functions
export const getAccessToken = (): string | null => getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
export const getRefreshToken = (): string | null => getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
export const getLocalUser = (): UserResponse | null => getStorageJSON<UserResponse | null>(STORAGE_KEYS.USER, null);

export const saveAccessToken = (token: string): boolean => setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, token);
export const saveRefreshToken = (refreshToken: string): boolean => setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
export const saveLocalUser = (user: UserResponse): boolean => setStorageJSON(STORAGE_KEYS.USER, user);

/**
 * Set tokens to storage
 */
export const saveTokens = (accessToken: string, refreshToken?: string): boolean => {
  const accessSuccess = saveAccessToken(accessToken);
  const refreshSuccess = refreshToken ? saveRefreshToken(refreshToken) : true;
  return accessSuccess && refreshSuccess;
};

/**
 * Get all tokens from storage
 */
export const getTokens = (): TokenPair => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
});

/**
 * Clear all authentication data from storage
 */
export const clearAuthStorage = (): boolean => {
  const results = [
    removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN),
    removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN),
    removeStorageItem(STORAGE_KEYS.USER),
  ];

  return results.every((result) => result === true);
};

/**
 * Save complete user session to storage
 */
export const saveUserSession = (userData: UserResponse): boolean => {
  const { access_token, refresh_token, ...userDataWithoutTokens } = userData;

  const results = [
    saveLocalUser(userDataWithoutTokens as UserResponse),
    saveTokens(access_token, refresh_token),
  ];

  return results.every((result) => result === true);
};

/**
 * Check if user session exists in storage
 */
export const hasUserSession = (): boolean => {
  const { accessToken, refreshToken } = getTokens();
  const userData = getLocalUser();

  return !!(accessToken && refreshToken && userData);
};

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