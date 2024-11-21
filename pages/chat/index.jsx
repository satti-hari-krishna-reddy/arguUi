import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "../../styles/structure/chatInterface.module.scss";

const DebateDesign = () => {
  const [messages, setMessages] = useState([]);
  const [debateTopic, setDebateTopic] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [isAi1Typing, setIsAi1Typing] = useState(false);
  const [isAi2Typing, setIsAi2Typing] = useState(false);
  const [isJudgeTyping, setIsJudgeTyping] = useState(false);
  const [pollingError, setPollingError] = useState(false);
  const [model1, setModel1] = useState("");
  const [persona1, setPersona1] = useState("");
  const [model2, setModel2] = useState("");
  const [persona2, setPersona2] = useState("");
  const chatBoxRef = useRef(null);
  const pollingInterval = useRef(null);

const debateID = uuidv4();  // Generates a unique string UUID


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isAi1Typing, isAi2Typing, isJudgeTyping]);

  const validateInputs = () => {
    if (!model1 || !persona1 || !model2 || !persona2 || !debateTopic.trim()) {
      alert("Please fill all fields: model1, persona1, model2, persona2, and debate topic.");
      return false;
    }
    return true;
  };

  const submitDebate = async () => {
    try {
      // Start polling immediately after making the API call
      startPolling();
  
      // Construct the GraphQL mutation query
      const query = `
      query StartDebate(
        $debateID: String!
        $model1: String!
        $model2: String!
        $persona1: String!
        $persona2: String!
        $debateTopic: String!
      ) {
        startDebate(
          debateID: $debateID
          model1: $model1
          model2: $model2
          persona1: $persona1
          persona2: $persona2
          debateTopic: $debateTopic
        ) {
          success
          message
        }
      }
    `;
  
      const variables = {
        debateID,
        model1,
        model2,
        persona1,
        persona2,
        debateTopic,
      };
  
      // Send the GraphQL request
      const response = await fetch(`${process.env.NEXT_PUBLIC_HYP_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const result = await response.json();
  
      if (result.data?.startDebate?.success) {
        console.log("Debate completed successfully");
      } else {
        throw new Error(result.data?.startDebate?.message || "Failed to start the debate");
      }
    } catch (error) {
      console.error(error);
  
      // Stop polling on error
      clearInterval(pollingInterval.current);
  
      // Set error state and update the conversation
      setPollingError(true);
      setMessages((prev) => [
        ...prev,
        { speaker: "Judge", text: "Error: Debate interrupted!", timestamp: new Date().toISOString() },
      ]);
    }
  };
  
  
  const handleSendMessage = () => {
    if (validateInputs()) {
      setIsInputVisible(false);
      submitDebate(); 
    }
  };
  

  const startPolling = () => {
    setPollingError(false);
    pollingInterval.current = setInterval(fetchMessages, 1200); // Start polling every second
  };
  
  let offset = 0; // Initialize offset

  const fetchMessages = async () => {
    try {
      // Start typing indicator for AI1 if this is the initial fetch
      if (offset === 0 && messages.length === 0) {
        setIsAi1Typing(true);
      }
  
      // Define the new GraphQL query
      const query = `
      query CurrentConversation($debateID: String!) {
        currentConversation(debateID: $debateID)
      }
    `;    
  
      // Variables for the query
      const variables = { debateID };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_HYP_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Extract and process new messages
        const parsedMessages = JSON.parse(data.data.currentConversation);
        if (parsedMessages.length > offset) {
          const newMessages = parsedMessages.slice(offset);
          offset = parsedMessages.length; // Update offset
  
          // Update the messages state with new messages
          setMessages((prev) => [...prev, ...newMessages]);
  
          // Handle typing states based on the last message
          const lastMessage = newMessages[newMessages.length - 1];
          setIsAi1Typing(false);
          setIsAi2Typing(false);
          setIsJudgeTyping(false);
  
          if (parsedMessages.length === 8) {
            setIsJudgeTyping(true);
          } else if (lastMessage.speaker === persona1) {
            setIsAi2Typing(true);
          } else if (lastMessage.speaker === persona2) {
            setIsAi1Typing(true);
          }
  
          // Stop polling if all 9 messages are received
          if (parsedMessages.length >= 9) {
            clearInterval(pollingInterval.current);
          }
        } else {
          // Handle typing states when no new messages are fetched
          const lastMessage = messages[messages.length - 1] || {};
          if (offset === 8) {
            setIsJudgeTyping(true);
          } else if (lastMessage.speaker === persona1) {
            setIsAi2Typing(true);
          } else if (lastMessage.speaker === persona2) {
            setIsAi1Typing(true);
          }
        }
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      // Handle errors and stop polling
      setPollingError(true);
      setMessages((prev) => [
        ...prev,
        { speaker: "Judge", text: "Error: Debate interrupted!", timestamp: new Date().toISOString() },
      ]);
      clearInterval(pollingInterval.current);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.topSelectors}>
        <div className={styles.dropdownPair}>
          <p style={{ marginTop: "5px" }}>Debater 1:</p>
          <select
            value={model1}
            onChange={(e) => setModel1(e.target.value)}
            className={styles.dropdown}
          >
            <option hidden>Select Model</option>
            <option value="gemini-1-5-flash">Gemini 1.5 Flash</option>
            <option value="gpt-3-5-turbo" disabled>GPT 3.5 Turbo</option>
            <option value="gemini-pro">Gemini Pro</option>
            <option value="gpt-4o-mini" disabled>GPT 4o mini</option>
            <option value="Meta-Llama-8B" disabled>Meta Llama 8B</option>
            <option value="gpt-4o" disabled>GPT 4o</option>
          </select>
          <select
            value={persona1}
            onChange={(e) => setPersona1(e.target.value)}
            className={styles.dropdown}
          >
            <option hidden>Select Persona</option>
            <option value="pragmatic_analyst">Pragmatic Analyst</option>
            <option value="visionary_idealist">Visionary Idealist</option>
            <option value="data_driven_skeptic">Data-driven Skeptic</option>
            <option value="empathetic_humanist">Empathetic Humanist</option>
          </select>
        </div>
        <div className={styles.dropdownPair}>
          <p style={{ marginTop: "5px" }}>Debater 2:</p>
          <select
            value={model2}
            onChange={(e) => setModel2(e.target.value)}
            className={styles.dropdown}
          >
            <option hidden>Select Model</option>
            <option value="gemini-1-5-flash">Gemini 1.5 Flash</option>
            <option value="gpt-3-5-turbo" disabled>GPT 3.5 Turbo</option>
            <option value="gemini-pro">Gemini Pro</option>
            <option value="gpt-4o-mini" disabled>GPT 4o mini</option>
            <option value="Meta-Llama-8B" disabled>Meta Llama 8B</option>
            <option value="gpt-4o" disabled>GPT 4o</option>
          </select>
          <select
            value={persona2}
            onChange={(e) => setPersona2(e.target.value)}
            className={styles.dropdown}
          >
            <option hidden>Select Persona</option>
            <option value="pragmatic_analyst">Pragmatic Analyst</option>
            <option value="visionary_idealist">Visionary Idealist</option>
            <option value="data_driven_skeptic">Data-driven Skeptic</option>
            <option value="empathetic_humanist">Empathetic Humanist</option>
          </select>
        </div>
      </div>

      <div className={styles.chatBox} ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.speaker === persona1
                ? styles.ai1
                : message.speaker === persona2
                ? styles.ai2
                : styles.judge
            }`}
          >
            <div className={styles.messageHeader}>
              <span className={styles.sender}>
                {message.speaker}
              </span>
            </div>
            <p className={styles.messageText}>{message.message}</p>
          </div>
        ))}

        {isAi1Typing && (
          <div className={`${styles.message} ${styles.ai1}`}>
            <div className={styles.typingLoader}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}

        {isAi2Typing && (
          <div className={`${styles.message} ${styles.ai2}`}>
            <div className={styles.typingLoader}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}

        {isJudgeTyping && (
          <div className={`${styles.message} ${styles.judge}`}>
            <div className={styles.typingLoader}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
      </div>

      {isInputVisible && (
        <div
          className={`${styles.messageBox} ${
            messages.length === 0 ? styles.centered : ""
          }`}
        >
          <input
            className={styles.chatBox}
            type="text"
            placeholder="Enter your debate topic..."
            value={debateTopic}
            onChange={(e) => setDebateTopic(e.target.value)}
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
      )}
    </div>
  );
};

export default DebateDesign;
