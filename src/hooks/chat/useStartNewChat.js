import { useMutation } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";
import { getChatSessionId } from "../../utils/chatSession";

export default function useStartNewChat() {
  const { mutate: startNewChat, isPending: isStartingChat } = useMutation({
    mutationFn: async () => {
      const sessionId = getChatSessionId();

      const res = await chatAxios.post("/new", {
        session_id: sessionId,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error New message");
      }
      return res.data;
    },
  });
  return { startNewChat, isStartingChat };
}
