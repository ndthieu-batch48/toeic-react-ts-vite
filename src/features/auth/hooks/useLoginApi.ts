import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/authService';
import { saveUserSession, clearAuthStorage } from '@/utils/localStorageUtil';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export function useLoginApi() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveUserSession(data);
      queryClient.setQueryData(['user'], data);
      toast.success('Login successful!');
      navigate({ to: '/tests' });
    },
    onError: (error) => {
      const errorMessage = error.toString();
      toast.error(errorMessage);
      clearAuthStorage();
    },
  });
}