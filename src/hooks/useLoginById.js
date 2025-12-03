// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "sonner";
// import { useNavigate } from "react-router";
// import { useCookies } from "react-cookie";
// import * as yup from "yup";
// import axiosInstance from "../utils/axiosInstance";

// export default function useLoginById(t) {
//   const navigate = useNavigate();
//   const [, setCookie] = useCookies(["token"]);

//   // Validation schema
//   const schema = yup.object().shape({
//     number_id: yup
//       .string()
//       .required(t("validation.required"))
//       .min(5, t("validation.min", { min: 5 })),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//     defaultValues: {
//       number_id: "",
//     },
//   });

//   const { mutate: submitLogin, isPending } = useMutation({
//     mutationFn: async (data) => {
//       const response = await axiosInstance.post("/login", data);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       if (data?.code === 200) {
//         toast.success(t("auth.loginSuccess"));

//         setCookie("token", data.data?.auth?.token, {
//           path: "/",
//           secure: true,
//           sameSite: "Strict",
//         });

//         navigate("/profile");
//       } else {
//         toast.error(t("auth.loginFailed"));
//       }
//     },
//     onError: (error) => {
//       toast.error(error.message || t("auth.somethingWentWrong"));
//     },
//   });

//   return {
//     register,
//     handleSubmit: handleSubmit(submitLogin),
//     errors,
//     isLoading: isPending,
//   };
// }
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import axiosInstance from "../utils/axiosInstance";

export default function useLoginById(t) {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  // Validation schema
  const schema = yup.object().shape({
    number_id: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      number_id: "",
    },
  });

  const { mutate: submitLogin, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.code === 200) {
        toast.success(t("auth.loginSuccess"));

        setCookie("token", data.data?.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        navigate("/profile");
      } else {
        toast.error(t("auth.loginFailed"));
      }
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error(t("auth.invalidCredentials"));
      } else {
        toast.error(error.message || t("auth.somethingWentWrong"));
      }
    },
  });

  return {
    register,
    onSubmit: handleSubmit(submitLogin),
    errors,
    isLoading,
  };
}
