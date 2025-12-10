import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useGetGroups() {
     const { lang } = useSelector((state) => state.settings);

  return useQuery({
    queryKey: ["groups", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/groups");
      return res.data.data;
    },
  });
}
