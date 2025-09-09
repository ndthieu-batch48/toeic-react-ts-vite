import { jwtDecode, type JwtPayload } from 'jwt-decode';

// Types
interface DecodedToken extends JwtPayload {
  exp: number;
  [key: string]: unknown;
}

/**
 * Decode JWT token safely
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token) return null;
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('JWT Decode', 'Failed to decode token', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  return decoded.exp < Date.now() / 1000;
};

/**
 * Get token expiration time in milliseconds
 */
export const getTokenExpiration = (token: string): number | null => {
  const decoded = decodeToken(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};

/**
 * Validate token structure and required fields
 */
export const validateToken = (token: string, requiredFields: string[] = ['exp']): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return false;

  return requiredFields.every((field) => Object.prototype.hasOwnProperty.call(decoded, field));
};

/**
 * Get remaining time until token expires
 */
export const getTokenTimeRemaining = (token: string): number | null => {
  const expirationTime = getTokenExpiration(token);
  if (!expirationTime) return null;

  const remainingTime = expirationTime - Date.now();
  return remainingTime > 0 ? remainingTime : 0;
};

/**
 * Check if token will expire within specified minutes
 */
export const isTokenExpiringSoon = (token: string, minutesThreshold: number = 5): boolean => {
  const timeRemaining = getTokenTimeRemaining(token);
  if (timeRemaining === null) return true;

  const thresholdMs = minutesThreshold * 60 * 1000;
  return timeRemaining <= thresholdMs;
};