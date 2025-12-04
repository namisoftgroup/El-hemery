
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetWalk() {
  const { lang } = useSelector((state) => state.settings);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["walkReturn", lang], 
    queryFn: async () => {
      const res = await axiosInstance.get("/walk-return-plan");
      console.log("WALK-RETURN-PLANE RESPONSE:", res.data);
      return res.data.data; 
    },
  });

  return { isLoading, data, error, refetch };
}
