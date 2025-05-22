import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatMain({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage: parentHandleSendMessage,
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    console.log("Button clicked!", { inputMessage });
    
    if (inputMessage.trim() === "" || isGenerating) {
      console.log("ChatMain: Empty input or already generating, aborting");
      return;
    }

    // Call the parent's handleSendMessage to add user message to chat
    console.log("ChatMain: Calling parent handleSendMessage");
    parentHandleSendMessage(e);

    // Now handle the AI response
    try {
      console.log("ChatMain: Attempting to call AI API...");
      setIsGenerating(true);

      const response = await axios.post('http://localhost:3000/api/ollama/generate', {
        prompt: inputMessage,
      });

      console.log("ChatMain: AI Response received:", response.data);

      // Create a message object for the AI response

      // Add this to messages by simulating a new message event
      const aiMessageEvent = {
        preventDefault: () => {},
        aiResponse: response.data.response // Pass the AI response in the event object
      };

      parentHandleSendMessage(aiMessageEvent, 'assistant');
      setIsGenerating(false);

    } catch (error) {
      console.error("ChatMain: Error getting AI response:", error);
      setIsGenerating(false);

      // Handle error by adding an error message to the chat
      const errorEvent = { preventDefault: () => {} };

      setInputMessage("Desculpe, não consegui processar sua solicitação.");
      parentHandleSendMessage(errorEvent, 'assistant');
      setInputMessage('');
    }
  };

  const testConnection = async () => {
    try {
      console.log("Testing API connection...");
      const response = await axios.get('http://localhost:3000/api/health');
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

  return (
    <div className="d-flex flex-column h-100">
      <div className="chat-messages flex-grow-1 p-3 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container d-flex ${
              message.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            } mb-3`}
          >
            {/* Rest of your component remains the same */}
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

      <div className="chat-input p-3 border-top">
        <form onSubmit={handleSendMessage} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter your message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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