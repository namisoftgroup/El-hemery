import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetVolunteer() {
   const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["volunteer" , lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/hajj-voulnter-page");
      return res.data.data; 
    },
  });
}
