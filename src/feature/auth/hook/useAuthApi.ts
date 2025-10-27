import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register } from '../service/authService';
import { saveUserSession } from '@/feature/auth/helper/authHelper';
import { toast } from "sonner"

export const useAuthApi = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response);
      saveUserSession(response)
      toast('Login success. Welcome back!')
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to login")
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response.user);
      saveUserSession(response.user)
      toast('Account created. Welcome!')
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create account")
    },
  });

  return { loginMutation, registerMutation }
}