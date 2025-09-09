import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register } from '../services/authService';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { clearUserSession, getUserSession, saveUserSession } from '@/features/helper/authHelper';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      saveUserSession(response);
      queryClient.setQueryData(['user'], response);
      toast.success('Login successful!');
      navigate({ to: '/test' });
    },
    onError: (error) => {
      const errorMessage = error.toString();
      toast.error(errorMessage);
      clearUserSession();
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      console.log(response)
      saveUserSession(response.user);
      queryClient.setQueryData(['user'], response.user);
      toast.success(response.message);
      navigate({ to: '/test' });
    },
    onError: (error) => {
      const errorMessage = error.toString();
      toast.error(errorMessage);
      clearUserSession();
    },
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userSession = getUserSession();
      return userSession;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return { loginMutation, registerMutation, userQuery }
}