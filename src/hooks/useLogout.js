import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosInstance";

export default function useLogout(t) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, , removeCookie] = useCookies(["token"]);

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout");

      if (response.data.code === 200) {
        removeCookie("token", { path: "/" });
        delete axiosInstance.defaults.headers.common["Authorization"];
        queryClient.invalidateQueries();
        queryClient.removeQueries();
        navigate("/signIn");
        toast.success(t("auth.logout_success"));
      }
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return {
    logout,
  };
}
