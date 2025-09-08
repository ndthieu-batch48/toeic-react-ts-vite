import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/authService';
import { saveUserSession, clearAuthStorage } from '@/utils/localStorageUtil';
import { toast } from 'sonner';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Save session to localStorage
      saveUserSession(data);

      // Cache user data
      queryClient.setQueryData(['auth', 'user'], data);

      // Show success message
      toast.success('Login successful!');
    },
    onError: (error) => {
      const errorMessage = error.toString();

      toast.error(errorMessage);

      clearAuthStorage();
    },
  });
}