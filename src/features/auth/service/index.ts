// import { axiosBase } from './axiosInstance/axiosInstance';

// export const loginUser = async (data) => {
//   const url = `/auth/login`;
//   try {
//     const res = await axiosBase.post(url, data);
//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

// export const registerUser = async (data) => {
//   const url = '/auth/register';
//   try {
//     const res = await axiosBase.post(url, data);
//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

// export const refreshTokenService = async (refreshToken) => {
//   const url = '/auth/refresh-token';
//   try {
//     const res = await axiosBase.post(url, { token: refreshToken });
//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

// export const sendOtpRequest = async ({ credential_value, credential_type, purpose }) => {
//   const url = '/auth/otp/request';
//   try {
//     const res = await axiosBase.post(url, { credential_value, credential_type, purpose });
//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

// export const verifyOtpRequest = async (otp, purpose) => {
//   const url = '/auth/otp/verify';
//   try {
//     const res = await axiosBase.post(url, { otp, purpose });
//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

// export const resetPassword = async (resetToken, newPassword) => {
//   try {
//     const res = await axiosBase.put('/auth/reset-password', {
//       token: resetToken,
//       new_password: newPassword,
//     });

//     return res.data;
//   } catch (error) {
//     throw new Error(extractAxiosError(error));
//   }
// };

