import { useMutation } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";
import { getChatSessionId } from "../../utils/chatSession";

export default function useSendMessage() {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (payload) => {
      const sessionId = getChatSessionId();

      const res = await chatAxios.post("/send", {
        ...payload,
        session_id: sessionId,
      });
      if (res.status !== 200) {
        throw new Error("Error sending message");
      }
      return res.data;
    },
  });
  return { sendMessage, isPending };
}
