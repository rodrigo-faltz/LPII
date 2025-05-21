import { useEffect, useState } from "react";
import ChatMain from "../components/ChatMain";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = {
        id: 1,
        content: "Olá! Como posso ajudar você hoje?",
        sender: "assistant",
        timestamp: new Date().toLocaleString("pt-BR"),
      };
      setMessages([initialMessage]);
    }
  }, []);

  const handleSendMessage = (e, sender = 'user') => {
    e.preventDefault();
    console.log("Parent handleSendMessage called", { sender });
    const messageContent = e.aiResponse || inputMessage;

    if ((sender === 'user' && inputMessage.trim() === "") || 
        (sender === 'assistant' && !e.aiResponse)) return;

    const newMessage = {
      id: messages.length + 1,
      content: messageContent,
      sender: sender,
      timestamp: new Date().toLocaleString("pt-BR"),
    };
    
    console.log("Adding new message:", newMessage);
    // Use o padrão de atualização funcional para garantir que estamos 
    // trabalhando com o estado mais recente
    setMessages(prevMessages => [...prevMessages, newMessage]);

    if (sender === 'user') {
      setInputMessage("");
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">
        <Sidebar />
        <div className="col main-content">
          <Header />
          <div className="d-flex flex-column">
            <ChatMain
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
