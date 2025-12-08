import { useState } from "react";

export default function FloatingWebView() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="floating-icon" onClick={() => setOpen(true)}>
        <img src="/icons/chat.svg" alt="chat" />
      </div>

      {open && (
        <div className="webview-popup">
          <div className="webview-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}><i className="fa-regular fa-circle-xmark"></i></button>
          </div>

          <iframe
            src="https://elhamiryelhag.nami-tec.com/en/chat"
            title="webview"
          />
        </div>
      )}
    </>
  );
}

// import { useState } from "react";

// export default function FloatingWebView() {
//   const [hover, setHover] = useState(false);

//   const openChat = () => {
//     window.open(
//       "https://elhamiryelhag.nami-tec.com/en/chat", 
//       "_blank",
//       "width=420,height=700"
//     );
//   };

//   return (
//     <>
//       <div
//         onClick={openChat}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "65px",
//           height: "65px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           zIndex: 9999,
//           transition: "0.2s ease",
//           transform: hover ? "scale(1.05)" : "scale(1)",
//         }}
//       >
//         <img
//           src="/icons/chat.svg"   
//           alt="chat"
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </div>
//     </>
//   );
// }
