import { useState, useEffect } from "react";
import chatAxios from "../utils/chatAxios";

export default function useChat() {
  const [threads, setThreads] = useState([]); // كل thread = { id, messages: [] }
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getThreads = async () => {
    try {
      setLoading(true);
      const res = await chatAxios.get("/threads");
      const threadsData = res.data.data.threads || [];

      // كل thread هيحتفظ برسائله
      setThreads(
        threadsData.map((t) => ({ id: t.id, messages: t.messages || [] }))
      );
      setActiveThreadId(res.data.data.active_thread_id || null);
    } catch (err) {
      console.error("Get threads error", err);
    } finally {
      setLoading(false);
    }
  };

const startNewChat = async () => {
  try {
    const res = await chatAxios.post("/new");
    const newId = res.data.data.new_thread_id;

    // اضيف thread جديد فارغ
    setThreads((prev) => [...prev, { id: newId, messages: [] }]);

    // نحدد الشات الجديد كـ active
    setActiveThreadId(newId);

    // نفرغ الرسائل عشان الشات يبقى جديد
    setMessages([]);
  } catch (err) {
    console.error("New chat error", err);
  }
};


  const getMessages = async (threadId) => {
    if (!threadId) return;
    try {
      setLoading(true);
      const res = await chatAxios.get(`/messages/${threadId}`);
      const msgs = res.data.data.messages || [];
      setMessages(msgs);
      setActiveThreadId(threadId);

      // حدث الرسائل في الـ threads
      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, messages: msgs } : t))
      );
    } catch (err) {
      console.error("Get messages error", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !activeThreadId) return;

    try {
      setMessages((prev) => [...prev, { type: "user", text }]);

      const res = await chatAxios.post("/send", {
        message: text,
        thread_id: activeThreadId,
      });

      const botReply = res.data.reply;

      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);

      // حدث الرسائل في الـ threads
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, { type: "user", text }, { type: "bot", text: botReply }] }
            : t
        )
      );
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

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
