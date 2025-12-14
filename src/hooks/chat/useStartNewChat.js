import { useMutation } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";

export default function useStartNewChat() {
  const { mutate: startNewChat, isPending: isStartingChat } = useMutation({
    mutationFn: async () => {
      const res = await chatAxios.post("/new");
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error New message");
      }
      return res.data;
    },
  });
  return { startNewChat, isStartingChat };
}
