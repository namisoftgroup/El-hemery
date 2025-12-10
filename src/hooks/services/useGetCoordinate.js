import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetSupervisors() {
  return useQuery({
    queryKey: ["supervisors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coordinate");
      return res.data.data;
    },
  });
}
