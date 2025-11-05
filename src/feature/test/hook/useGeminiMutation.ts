import { useMutation } from "@tanstack/react-query";
import { testMutation } from "../service/testService";

export const useGeminiMutation = () => {
  // const queryClient = useQueryClient();

  const transQuesMutation = useMutation({
    ...testMutation.transQuesWithGemini(),
    // onSuccess: (data) => {},
    // onError: (error) => {},
  });

  const explainQuesMutation = useMutation({
    ...testMutation.explainQuesWithGemini(),
  });

  return {
    transQuesMutation,
    explainQuesMutation,
  };
};
