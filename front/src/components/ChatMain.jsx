export default function ChatMain({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) {
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
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
