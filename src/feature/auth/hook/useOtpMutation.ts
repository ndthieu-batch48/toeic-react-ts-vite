import { useMutation } from "@tanstack/react-query";
import { authMutation } from "../service/authService";
import { clearOtpSession, createOtpSession, updateOtpSession } from "../helper/authHelper";

export const useOtpMutation = () => {

  const sendOtpMutation = useMutation({
    ...authMutation.sendOtp(),
    onSuccess: (response, request) => {

      createOtpSession({
        credential: request.credential,
        credential_type: request.credential_type,
        purpose: request.purpose,
        token: ''
      })

      console.log(response)

    },
  });

  const verifyOtpMutation = useMutation({
    ...authMutation.verifyOtp(),
    onSuccess: (response) => {

      updateOtpSession({
        token: response.token
      })

    },
  });

  const resetPasswordMutation = useMutation({
    ...authMutation.resetPassword(),
    onSuccess: (response) => {
      console.log(response)
      clearOtpSession()

    },
  });

  return { sendOtpMutation, verifyOtpMutation, resetPasswordMutation };
};