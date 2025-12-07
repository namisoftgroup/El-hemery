import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosInstance.get("/our-service");
      return res.data.data; 
    },
  });
}
