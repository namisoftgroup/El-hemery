import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetSupplication() {
  const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["Supplication", lang], 
    queryFn: async () => {
      const res = await axiosInstance.get("/Supplication");
      console.log("COMING BY CARS RESPONSE:", res.data);
      return res.data.data; 
    },
  });

  return { isLoading, data, error, refetch };
}
