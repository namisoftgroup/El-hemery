import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetByCar() {
  const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["comingByCars", lang], 
    queryFn: async () => {
      const res = await axiosInstance.get("/coming-by-cars");
      console.log("COMING BY CARS RESPONSE:", res.data);
      return res.data.data; 
    },
  });

  return { isLoading, data, error, refetch };
}
