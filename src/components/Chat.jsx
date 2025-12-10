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
  } = useChat();

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <div className="floating-icon" onClick={() => setOpen(true)}>
        <img src="/icons/chat.svg" alt="chat" />
      </div>

      {open && (
        <div className="chat-widget">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">مساعد ذكي</div>
            <button className="close-chat" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>

          {/* Buttons */}
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

          {/* Old Chats Sidebar */}
          {showOldChats && (
            <div
              className="old-chats-overlay"
              onClick={() => setShowOldChats(false)} // اختفاء لما تدوسي برا
            >
              <div
                className="old-chats-list"
                onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط جوه
              >
                {threads.filter(t => t.messages.length > 0).length === 0 && (
                  <p className="no-old-chats">لا توجد دردشات سابقة</p>
                )}

                {threads
                  .filter(t => t.messages.length > 0)
                  .map((thread) => {
                    const firstMsg = thread.messages[0].text;
                    return (
                      <div
                        key={thread.id}
                        className="old-chat-item"
                        onClick={() => {
                          getMessages(thread.id); // تحميل الرسائل للشات
                          setShowOldChats(false); // إخفاء الـ sidebar
                        }}
                      >
                        🗨️ {firstMsg}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Chat Body */}
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

            {/* {loading && <p style={{ textAlign: "center" }}>جاري التحميل...</p>} */}
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="اسأل مساعدك الذكي"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={showOldChats}
            />
            <button onClick={handleSend} disabled={showOldChats}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
