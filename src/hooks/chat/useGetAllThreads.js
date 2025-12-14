import { useQuery } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";

export default function useGetAllThreads(enabled) {
  console.log(enabled);

  const { data: threads, isLoading } = useQuery({
    queryKey: ["threads", enabled],
    queryFn: async () => {
      const res = await chatAxios.get("/threads");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      console.log("threads res ", res.data.data);

      return res.data.data;
    },
    enabled,
  });
  return { threads, isLoading };
}
