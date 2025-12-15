import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useGetAllThreads from "../hooks/chat/useGetAllThreads";
import useSendMessage from "../hooks/chat/useSendMessage";
import useStartNewChat from "../hooks/chat/useStartNewChat";
import useGetMessages from "../hooks/chat/useGetMessages";

import { ensureChatSession, createNewChatSession } from "../utils/chatSession";

export default function FloatingChat() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showOldChats, setShowOldChats] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  /* -------------------- SESSION INIT -------------------- */
  useEffect(() => {
    if (open) {
      const sid = ensureChatSession();
      if (sid) {
        setSessionId(sid);
      } else {
        createNewChatSession();
      }
    }
  }, [open]);

  /* -------------------- DATA -------------------- */
  const { threads, isLoading: isLoadingThreads } = useGetAllThreads(
    showOldChats,
    sessionId
  );

  const { messages = [], isGettingMessages } = useGetMessages(
    activeThreadId,
    sessionId
  );

  const { sendMessage, isPending } = useSendMessage();
  const { startNewChat, isStartingChat } = useStartNewChat();

  const messagesQueryKey = ["messages", activeThreadId, sessionId];

  /* -------------------- SEND MESSAGE -------------------- */
  const handleSend = () => {
    if (!message.trim() || isPending || !sessionId) return;

    const messageToSend = message.trim();
    const tempId = Date.now();

    const payload = {
      message: messageToSend,
      thread_id_for_post: activeThreadId,
      session_id: sessionId,
    };

    const optimisticMessage = {
      id: tempId,
      content: messageToSend,
      role: "user",
      isOptimistic: true,
    };

    const previousData = queryClient.getQueryData(messagesQueryKey);

    queryClient.setQueryData(messagesQueryKey, (old) => ({
      ...old,
      messages: [...(old?.messages || []), optimisticMessage],
    }));
    sendMessage(payload, {
      onSuccess: (res, variables, context) => {
        console.log("onSuccess :", res);

        const confirmedMessage = {
          ...res.data.newMessage,
          isOptimistic: false,
        };
        console.log("confirmed message", confirmedMessage);

        queryClient.setQueryData(messagesQueryKey, (old) => ({
          ...old,
          messages: old.messages.map((msg) =>
            msg.id === context.tempId ? confirmedMessage : msg
          ),
        }));

        if (!activeThreadId && res.data.new_thread_id) {
          setActiveThreadId(res.data.new_thread_id);
          queryClient.invalidateQueries({
            queryKey: ["threads", sessionId],
          });
        }
      },

      onError: (e) => {
        console.log(e.message);

        queryClient.setQueryData(messagesQueryKey, previousData);
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: messagesQueryKey });
      },
    });

    setMessage("");
  };

  /* -------------------- OLD CHAT CLICK -------------------- */
  const handleOldChatClick = (threadId) => {
    setShowOldChats(false);
    setActiveThreadId(threadId);
  };

  /* -------------------- NEW CHAT -------------------- */
  const handleStartNewChat = () => {
    setActiveThreadId(null);

    queryClient.removeQueries({ queryKey: ["messages"] });
    queryClient.removeQueries({ queryKey: ["threads"] });

    startNewChat(
      { session_id: sessionId },
      {
        onSuccess: (res) => {
          setActiveThreadId(res?.data?.new_thread_id);
          queryClient.invalidateQueries({
            queryKey: ["threads", sessionId],
          });
        },
      }
    );
  };
  const messageList = messages?.messages ?? [];
  const hasMessages = messageList.length > 0;
  /* -------------------- UI -------------------- */
  return (
    <>
      <div className="floating-icon" onClick={() => setOpen(true)}>
        <img src="/icons/chat.svg" alt="chat" />
      </div>

      {open && (
        <div className="chat-widget">
          <div className="chat-header">
            <div className="chat-title">مساعد ذكي</div>
            <button className="close-chat" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>

          <div className="chat-buttons">
            <button
              onClick={() => setShowOldChats((p) => !p)}
              className="old-chat"
            >
              دردشة قديمة
            </button>
            <button onClick={handleStartNewChat} disabled={isStartingChat}>
              دردشة جديدة
            </button>
          </div>

          {showOldChats && (
            <div className="old-chats-overlay">
              <div className="d-flex align-items-center justify-content-between">
                <p className="m-0"> الدردشات القديمة</p>

                <button
                  className="close-chat fs-5"
                  onClick={() => setShowOldChats(false)}
                >
                  &times;
                </button>
              </div>
              <div className="old-chats-list">
                {isLoadingThreads && <p>جاري التحميل...</p>}
                {threads?.threads?.map((thread) => (
                  <button
                    key={thread?.id}
                    onClick={() => handleOldChatClick(thread?.id)}
                    className=""
                  >
                    {thread?.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-body">
            {isGettingMessages && <p>جاري تحميل الرسائل...</p>}
            {console.log(
              messages?.messages?.length === 0 || !isGettingMessages
            )}
            {console.log(messages?.messages?.length === 0, !isGettingMessages)}
            {console.log(messages?.messages?.length)}
            {!isGettingMessages && !hasMessages && (
              <div className="chat-center">
                <div className="chat-images">
                  <img src="/icons/robot.svg" alt="robot" />
                  <img src="/images/logo.svg" alt="logo" />
                </div>
                <p>بحاجة إلى مساعدة!</p>
              </div>
            )}

            {messages?.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${
                  msg?.role === "user" ? "user" : "bot"
                }`}
              >
                {msg?.content}
                {msg.isOptimistic && <span>...</span>}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="اسأل مساعدك الذكي"
            />
            <button onClick={handleSend} disabled={isPending}>
              إرسال
            </button>
          </div>
        </div>
      )}
    </>
  );
}
