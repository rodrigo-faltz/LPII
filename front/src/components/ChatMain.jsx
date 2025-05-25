import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

export default function ChatMain({
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage: parentHandleSendMessage,
  chatId,
  userId,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesContainerRef = useRef(null);
  const pollingIntervalRef = useRef(null); // Store the interval reference
  const lastMessageCountRef = useRef(0); // Track number of messages to detect new ones

  const handleSendMessage = async (e) => {
    e.preventDefault();

    console.log("Button clicked!", { inputMessage });

    if (inputMessage.trim() === "" || isGenerating) {
      console.log("ChatMain: Empty input or already generating, aborting");
      return;
    }

    console.log("ChatMain: Calling parent handleSendMessage");
    parentHandleSendMessage(e);

    try {
      console.log("ChatMain: Saving user message to database...");
      const responseDb = await axios.post(
        "http://localhost:3000/api/message", 
        {
          content: inputMessage,
          chat_id: Number(chatId), // Mudar para chatId quando implementado
          author_id: Number(userId), // Mudar para userId quando implementado
        }
      );
      
      // Load chat history immediately after sending
      await loadChatHistory();
      console.log("ChatMain: User message saved to database:", responseDb.data);
      
      // Store the current message count for comparison
      lastMessageCountRef.current = messages.length;
      
      // Clear any existing polling interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      
      console.log("ChatMain: Starting polling for AI response...");
      setIsGenerating(true);
      let attempts = 0;
      const maxAttempts = 90; // Stop after ~30 seconds

      pollingIntervalRef.current = setInterval(async () => {
        attempts++;
        console.log(`Polling attempt ${attempts}/${maxAttempts}`);
        
        await loadChatHistory();
        
        // If we've waited too long, stop polling
        if (attempts >= maxAttempts) {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setIsGenerating(false);
          console.log("Stopped polling after maximum attempts");
        }
      }, 1000); // Check every second
    } catch (error) {
      console.error("ChatMain: Error getting AI response:", error);
      setIsGenerating(false);

      const errorEvent = { preventDefault: () => {} };

      setInputMessage("Desculpe, não consegui processar sua solicitação.");
      parentHandleSendMessage(errorEvent, "assistant");
      setInputMessage("");
    }
  };

  const testConnection = async () => {
    try {
      console.log("Testing API connection...");
      const response = await axios.get("http://localhost:3000/api/health");
      console.log("API connection successful:", response.data);
      return true;
    } catch (error) {
      console.error("API connection failed:", error);
      return false;
    }
  };

  const loadChatHistory = async () => {
    try {
      const effectiveChatId = chatId
      console.log(`ChatMain: Carregando histórico para o chat ${effectiveChatId}...`);
      const response = await axios.get(`http://localhost:3000/api/message/chat/${effectiveChatId}`);

      if (response.data && Array.isArray(response.data)) {
        console.log(`ChatMain: ${response.data.length} mensagens carregadas`);

        const formattedMessages = response.data.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.author_id === 0 ? 'assistant' : 'user',
          timestamp: new Date(msg.created_at).toLocaleString("pt-BR")
        }));

        if (typeof setMessages === 'function') {
          setMessages(formattedMessages);
        } else {
          console.warn("ChatMain: setMessages não é uma função, não é possível atualizar o estado");
        }
      } else {
        console.log("ChatMain: Nenhuma mensagem encontrada para este chat");
      }
    } catch (error) {
      console.error("ChatMain: Erro ao carregar histórico de mensagens:", error);
    }
  };

  // Effect to check if a new message from the assistant has arrived
  useEffect(() => {
    // If we're expecting a response and messages have increased
    if (isGenerating && messages.length > lastMessageCountRef.current) {
      // Check if the newest message is from the assistant
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.sender === "assistant") {
        console.log("AI response received, stopping polling");
        
        // Clear the polling interval
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        
        setIsGenerating(false);
      }
    }
    
    // Update our reference to the current message count
    lastMessageCountRef.current = messages.length;
  }, [messages, isGenerating]);

  useEffect(() => {
    testConnection();
    loadChatHistory();
    
    // Clean up polling on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
  console.log("ChatMain: useEffect para carregar histórico executado");
  console.log("ChatId:", chatId, "UserId:", userId);
  
  if (chatId) {
    loadChatHistory();
  }
  }, [chatId]); // Carrega o histórico quando o chatId muda

  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      <div
        ref={messagesContainerRef}
        className="chat-messages flex-grow-1 p-3 overflow-auto"
        style={{ minHeight: 0 }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container d-flex ${
              message.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            } mb-3`}
          >
            {message.sender === "assistant" && (
              <div className="message-timestamp small text-muted me-2 align-self-end">
                {message.timestamp.split(" ")[1]}
              </div>
            )}

            <div
              className={`message p-3 rounded ${
                message.sender === "user" ? "message-user" : "message-assistant"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {message.sender === "user" && (
              <div className="message-timestamp small text-muted ms-2 align-self-end">
                {message.timestamp.split(" ")[1]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input p-3 border-top flex-shrink-0">
        <form onSubmit={handleSendMessage} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Escreva sua mensagem..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}