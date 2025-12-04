import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
export default function useGetFaqs() {
 const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["Faqs", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/fqs");
      console.log("FAQS RESPONSE:", res.data);
      return res.data.data; 
    },
  });

  return { isLoading, data, error, refetch };
}
