import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetLocationDetails(id) {
  return useQuery({
    queryKey: ["location-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/locations/${id}`);
      return res.data.data; 
    },
    enabled: !!id, 
  });
}
