import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/structure/chatInterface.module.scss";

const DebateDesign = () => {
  const [messages, setMessages] = useState([
    // { sender: "ai", text: "What can I help with?" }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;

    // Add user message
    setMessages([...messages, { sender: "user", text: currentMessage }]);
    setCurrentMessage("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "This is an AI response to your message." }
      ]);
    }, 1500); // Typing delay
  };
  return (
    <div className={styles.container}>
    
  
      <div className={styles.topSelectors}>
        <div className={styles.dropdownPair}>
        <p style={{ marginTop: "5px" }}>Debater 1:</p>
          <select className={styles.dropdown}>
            <option>Select Model</option>
            <option>AI Model wstertgr reg  1</option>
            <option>AI Model 2</option>
            <option>AI Model 2</option>
            <option>AI Model 2</option>
          </select>
          <select className={styles.dropdown}>
            <option>Select Persona</option>
            <option>Friendly</option>
            <option>Formal</option>
          </select>
        </div>
        <div className={styles.dropdownPair}>
        <p style={{ marginTop: "5px" }}>Debater 2:</p>
          <select className={styles.dropdown}>
            <option>Select Model</option>
            <option>AI Model 1</option>
            <option>AI Model 2</option>
          </select>
          <select className={styles.dropdown}>
            <option>Select Persona</option>
            <option>Professional</option>
            <option>Casual</option>
          </select>
        </div>
      </div>

      <div className={styles.chatBox} ref={chatBoxRef}>
      
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.sender === "user" ? styles.user : styles.ai
            }`}
          >
            <div className={styles.messageHeader}>
              <span className={styles.sender}>
                {message.sender === "user" ? "User" : "AI Bot"}
              </span>
            </div>
            <p className={styles.messageText}>{message.text}</p>
          </div>
        ))}


        {isTyping && (
       <div className={`${styles.message} ${styles.ai}`}>
       <div className={styles.typingLoader}>
         <span>.</span>
         <span>.</span>
         <span>.</span>
       </div>
     </div>
   )}
      </div>


      <div
        className={`${styles.messageBox} ${
          messages.length === 0 ? styles.centered : ""
        }`}
      >
        <input  className={styles.chatInput}
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>
  
    </div>
  );
};

export default DebateDesign;
