import { useQuery } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";
import { getChatSessionId } from "../../utils/chatSession";

export default function useGetMessages(threadId) {
  const sessionId = getChatSessionId();

  const { data: messages, isLoading: isGettingMessages } = useQuery({
    queryKey: ["messages", threadId, sessionId],
    queryFn: async () => {
      const res = await chatAxios.get(`messages/${threadId}`, {
        params: { session_id: sessionId },
      });

      if (res.status !== 200) {
        throw new Error(
          res.data.message || "Error Get Message form chosen Thread"
        );
      }

      return res.data;
    },
    enabled: !!threadId && !!sessionId,
  });
  return { messages, isGettingMessages };
}
