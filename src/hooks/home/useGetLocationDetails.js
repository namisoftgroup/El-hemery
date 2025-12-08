import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetLocationDetails(id) {
  const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["location-details", id, lang], 
    queryFn: async () => {
      const res = await axiosInstance.get(`/locations/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}
