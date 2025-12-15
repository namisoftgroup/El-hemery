import { useQuery } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";
import { getChatSessionId } from "../../utils/chatSession";

export default function useGetAllThreads(enabled) {
  const sessionId = getChatSessionId();

  const { data: threads, isLoading } = useQuery({
    queryKey: ["threads", enabled, sessionId],
    queryFn: async () => {
      const res = await chatAxios.get("/threads", {
        params: { session_id: sessionId },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      console.log("threads res ", res.data.data);

      return res.data.data;
    },
    enabled: enabled && !!sessionId,
  });
  return { threads, isLoading };
}
