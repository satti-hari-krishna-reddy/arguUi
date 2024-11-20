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