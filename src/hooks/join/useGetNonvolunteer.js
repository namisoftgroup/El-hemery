import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetNonVolunteer() {
   const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["nonvolunteer" , lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/non-hajj-voulnter-page");
      return res.data.data; 
    },
  });
}
