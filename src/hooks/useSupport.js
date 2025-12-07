import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function useSupportForm(type) {
  const [message, setMessage] = useState("");
  const { t } = useTranslation(); 

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("type", type);

      const res = await axiosInstance.post("/support", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success( t("support.sending"));
      setMessage(""); 
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("support.error"));
    },
  });

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!message.trim()) {
      toast.error(t("support.messageRequired"));
      return;
    }
    mutation.mutate();
  };

  return {
    message,
    setMessage,
    handleSubmit,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
}
