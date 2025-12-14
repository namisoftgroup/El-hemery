import { useState } from "react";
import useChat from "../hooks/useChat";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showOldChats, setShowOldChats] = useState(false);

  const {
    threads,
    messages,
    loading,
    startNewChat,
    getMessages,
    sendMessage,
    activeThreadId,
  } = useChat();

  const handleSend = async (e) => {
    console.log("start sending in prod ");

    e.preventDefault();
    if (!message.trim()) return;
    console.log("start sending in prod there is message  ");
    console.log("message :", message);

    await sendMessage(message);
    // setMessage("");
  };

  const handleOldChatClick = (threadId) => {
    setShowOldChats(false);
    getMessages(threadId);
  };

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

          {/* أزرار التحكم */}
          <div className="chat-buttons">
            <button
              className="old-chat"
              onClick={() => setShowOldChats((prev) => !prev)}
            >
              دردشة قديمة
            </button>
            <button className="new-chat" onClick={startNewChat}>
              دردشة جديدة
            </button>
          </div>

          {/* قائمة الشات القديم */}
          {showOldChats && (
            <div
              className="old-chats-overlay"
              onClick={() => setShowOldChats(false)}
            >
              <div
                className="old-chats-list"
                onClick={(e) => e.stopPropagation()}
              >
                {threads.filter((t) => t.messages.length > 0).length === 0 && (
                  <p className="no-old-chats">لا توجد دردشات سابقة</p>
                )}

                {threads
                  .filter((t) => t.messages.length > 0)
                  .map((thread) => (
                    <div
                      key={thread.id}
                      className={`old-chat-item ${
                        thread.id === activeThreadId ? "active" : ""
                      }`}
                      onClick={() => handleOldChatClick(thread.id)}
                    >
                      🗨️ {thread.messages[0].text}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* جسم الشات */}
          <div className="chat-body">
            {messages.length === 0 && !loading && !showOldChats && (
              <div className="chat-center">
                <div className="chat-images">
                  <img src="/icons/robot.svg" alt="robot" />
                  <img src="/images/logo.svg" alt="logo" />
                </div>
                <p>بحاجة إلى مساعدة!</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.type === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* إدخال الرسائل */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="اسأل مساعدك الذكي"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
            />
            <button onClick={(e) => handleSend(e)}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
