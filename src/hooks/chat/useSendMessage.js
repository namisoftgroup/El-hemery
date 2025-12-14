import { useMutation } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";

export default function useSendMessage() {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await chatAxios.post("/send", payload);
      if (res.data.code !== 200) {
        throw new Error("Error sending message");
      }
      return res.data;
    },
  });
  return { sendMessage, isPending };
}
