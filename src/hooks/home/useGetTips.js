import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetTips() {
   const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["Tips" , lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/tip");
      return res.data.data; 
    },
  });
}
