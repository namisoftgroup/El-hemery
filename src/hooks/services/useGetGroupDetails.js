// hooks/services/useGetGroupDetails.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetGroupDetails(id) {
     const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["group-details", id ,lang],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosInstance.get(`/groups/${id}`);
      return res.data.data;
    },
  });
}
