import { useEffect, useState } from "react";
import chatAxios from "../utils/chatAxios";

export default function useChat() {
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب كل الشاتات
  const getThreads = async () => {
    try {
      setLoading(true);
      const res = await chatAxios.get("/threads");
      const threadsData = res?.data?.data?.threads || [];

      setThreads(
        threadsData.map((t) => ({
          id: t.id,
          messages: t.messages || [],
        }))
      );

      const activeId = res?.data?.data?.active_thread_id || null;
      setActiveThreadId(activeId);

      if (activeId) {
        const active = threadsData.find((t) => t.id === activeId);
        const msgs = formatMessages(active?.messages || []);
        setMessages(msgs);
      }
    } catch (err) {
      console.error("Get threads error", err);
    } finally {
      setLoading(false);
    }
  };

  // تنسيق الرسائل لتكون متوافقة مع { type, text }
  const formatMessages = (msgs) =>
    msgs.map((m) => ({
      type: m.type || "bot",
      text: m.text || m.message || "",
    }));

  // إنشاء شات جديد
  const startNewChat = async () => {
    try {
      const res = await chatAxios.post("/new");
      const newId = res?.data?.data?.new_thread_id;
      if (!newId) return;

      setThreads((prev) => [...prev, { id: newId, messages: [] }]);
      setActiveThreadId(newId);
      setMessages([]);
    } catch (err) {
      console.error("New chat error", err);
    }
  };

  // جلب رسائل شات محدد
  const getMessages = async (threadId) => {
    if (!threadId) return;
    try {
      setLoading(true);
      const res = await chatAxios.get(`/messages/${threadId}`);
      const msgs = formatMessages(res?.data?.messages || []);

      setActiveThreadId(threadId);
      setMessages(msgs);

      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, messages: msgs } : t))
      );
    } catch (err) {
      console.error("Get messages error", err);
    } finally {
      setLoading(false);
    }
  };

  // إرسال رسالة
  const sendMessage = async (text) => {
    console.log("text:", text);

    if (!text.trim() || !activeThreadId) return;
    try {
      const userMsg = { type: "user", text };
      setMessages((prev) => [...prev, userMsg]);

      const res = await chatAxios.post("/send", {
        message: text,
        thread_id_for_post: activeThreadId,
      });

      const botReply = { type: "bot", text: res?.data?.reply || "" };
      setMessages((prev) => [...prev, botReply]);

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...(t.messages || []), userMsg, botReply] }
            : t
        )
      );
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  // useEffect(() => {
  //   getThreads();
  // }, []);

  return {
    threads,
    activeThreadId,
    messages,
    loading,
    startNewChat,
    getMessages,
    sendMessage,
  };
}
