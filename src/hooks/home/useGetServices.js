import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetServices() {
   const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["services" , lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/our-service");
      return res.data.data; 
    },
  });
}
