import { useQuery } from "@tanstack/react-query";
import chatAxios from "../../utils/chatAxios";

export default function useGetMessages(threadId) {
  const { data, isLoading: isGettingMessages } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      const res = await chatAxios.get(`messages/threadId`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "Error Get Message form chosen Thread"
        );
      }
      return res.data;
    },
  });
  return { data, isGettingMessages };
}
