import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function useSurvey() {
  const { t } = useTranslation(); 

  const mutation = useMutation({
    mutationFn: async (answers) => {
      const formattedAnswers = answers.map(item => ({
        survy_id: item.survy_id,
        answer: item.answer ? 1 : 0,
      }));

      const res = await axiosInstance.post("/survy", { surveys: formattedAnswers }, {
        headers: { "Content-Type": "application/json" },
      });

      return res.data;
    },
    onSuccess: (data) => {
      toast.success(t("support.sucess")|| data?.message );
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("support.error"));
    },
  });

  const sendSurvey = (answers) => {
    if (!answers || !answers.length) {
      toast.error(t("support.chooseOne"));
      return;
    }
    mutation.mutate(answers);
  };

  return {
    sendSurvey,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
