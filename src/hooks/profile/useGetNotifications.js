import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetNotifications() {
  const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error } = useQuery({
    queryKey: ["notifications", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/notifications");
        if (res.data.code === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        throw error;
      }
    },
  });
  return { isLoading, data, error };
}
