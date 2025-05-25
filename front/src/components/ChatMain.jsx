import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatMain({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage: parentHandleSendMessage,
  chatId,
  userId,

}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesContainerRef = useRef(null);

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
      // if (!chatId || !userId) {
      //   console.error("ChatMain: Missing chatId or userId", { chatId, userId });
      // }

      console.log("ChatMain: Saving user message to database...");
      const responseDb = await axios.post(
        "http://localhost:3000/api/message", 
        {
          content: inputMessage,
          chat_id: 1, // Mudar para chatId quando implementado
          author_id: 1, // Mudar para userId quando implementado
        }
      );
      console.log("ChatMain: User message saved to database:", responseDb.data);

      console.log("ChatMain: Attempting to call AI API...");
      setIsGenerating(true);

      const response = await axios.post(
        "http://localhost:3000/api/ollama/generate",
        {
          prompt: inputMessage,
        }
      );

      console.log("ChatMain: AI Response received:", response.data);
      const aiResponseDb = await axios.post("http://localhost:3000/api/message",
        {
          content: response.data.response,
          chat_id: 1, //Mudar para chatId quando implementado
          author_id: 0 
        }
      );
      console.log("ChatMain: AI message saved to database", aiResponseDb.data);


      const aiMessageEvent = {
        preventDefault: () => {},
        aiResponse: response.data.response, 
      };

      parentHandleSendMessage(aiMessageEvent, "assistant");
      setIsGenerating(false);
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

  

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

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
              {message.content}
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
            placeholder="Enter your message"
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
