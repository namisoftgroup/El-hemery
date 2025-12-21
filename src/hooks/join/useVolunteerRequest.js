// hooks/join/useVolunteerRequest.js
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useVolunteerRequest(t, onSuccess, type) {
  // ✅ default values حسب النوع
  const defaultValues =
    type === "hajj"
      ? {
          name: "",
          age: "",
          booking_number: "",
          city: "",
        }
      : {
          name: "",
          age: "",
          nationality: "",
          phone_code: "",
          phone: "",
          experience: "",
        };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      // 🧠 body ذكي
      const body = {
        ...data,
        type,
      };

      const res = await axiosInstance.post("/volunteer-request", body);
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.code && data.code !== 200) {
        toast.error(data.message || t("join.errorMessage"));
        return;
      }

      toast.success(data.message || t("join.successMessage"));
      reset();
      if (onSuccess) onSuccess();
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || t("join.errorMessage"));
    },
  });

  return {
    register,
    onSubmit: handleSubmit(mutation.mutate),
    errors,
    isLoading: mutation.isLoading,
    reset,
  };
}
