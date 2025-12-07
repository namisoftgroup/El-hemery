import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import * as yup from "yup";
import axiosInstance from "../utils/axiosInstance";

export default function useContact(t) {
  const schema = yup.object().shape({
    name: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    message: yup.string().required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate: submitContact, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/contact-us", {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success(t("contact.success"));
      reset();
    },
    onError: (error) => {
      toast.error(error.message || t("auth.somethingWentWrong"));
    },
  });

  return {
    register,
    handleSubmit: handleSubmit(submitContact),
    errors,
    isLoading: isPending,
  };
}
