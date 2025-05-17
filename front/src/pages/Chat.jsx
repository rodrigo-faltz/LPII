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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleString("pt-BR"),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        content: "Entendido! Vou preparar mais conteúdo sobre esse tema.",
        sender: "assistant",
        timestamp: new Date().toLocaleString("pt-BR"),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
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
