import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
export default function useGetHome() {
  const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["slides", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/slider");
      console.log("SLIDER RESPONSE:", res.data);
      return res.data.data;
    },
  });

  return { isLoading, data, error, refetch };
}
