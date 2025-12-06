import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/locations");
      return res.data.data; 
    },
  });
}
