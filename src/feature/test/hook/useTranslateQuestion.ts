import { useMutation } from "@tanstack/react-query";
import { testMutation } from "../service/testService";

export const useTranslateQuestion = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    ...testMutation.transQuesWithGemini(),

    // TODO: Save translation data to database
    // onSuccess: (data) => {},
    // onError: (error) => {},
  });
};
