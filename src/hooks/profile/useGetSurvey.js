import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetSurvey() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      const res = await axiosInstance.get("/survy");
      if (res.data.code === 200) {
        return res.data.data; 
      }
      throw new Error("فشل تحميل الاستبيان");
    },
  });

  return { data, isLoading, error };
}
