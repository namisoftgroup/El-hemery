import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetLocations() {
    const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["locations", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/locations");
      return res.data.data; 
    },
  });
}
