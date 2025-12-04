import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
export default function useGetGuides() {
 const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["guides", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/guides");
      console.log("GUIDES RESPONSE:", res.data);
      return res.data.data; 
    },
  });

  return { isLoading, data, error, refetch };
}
