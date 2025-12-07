import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance"; // تأكدي أن المسار صحيح
import { toast } from "sonner";

export default function useSurvey() {
  // Mutation لإرسال بيانات الاستبيان
  const mutation = useMutation({
    mutationFn: async (answers) => {
      // answers يجب أن تكون مصفوفة من objects حسب API: [{ survy_id: 1, answer: 1 }, ...]
      const formData = new FormData();

      answers.forEach((item, index) => {
        formData.append(`surveys[${index}][survy_id]`, item.survy_id);
        formData.append(`surveys[${index}][answer]`, item.answer);
      });

      const res = await axiosInstance.post("/survy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "تم إرسال الاستبيان بنجاح ✅");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الإرسال");
    },
  });

  const sendSurvey = (answers) => {
    if (!answers || !answers.length) {
      toast.error("الرجاء اختيار إجابة واحدة على الأقل");
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
