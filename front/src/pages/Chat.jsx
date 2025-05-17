import { useState } from "react";
import ChatMain from "../components/ChatMain";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Preciso de ajuda com equação de primeiro grau",
      sender: "user",
      timestamp: "01/04/2025 9:41",
    },
    {
      id: 2,
      content:
        "De que forma você prefere para estudar esse conteúdo? Mais interativo ou em formato de aula?",
      sender: "assistant",
      timestamp: "01/04/2025 9:42",
    },
    {
      id: 3,
      content: "Prefiro de uma forma mais interativa",
      sender: "user",
      timestamp: "01/04/2025 9:43",
    },
    {
      id: 4,
      content:
        "Vou gerar alguns cards para você interagir de acordo com o conteúdo de equação de primeiro grau",
      sender: "assistant",
      timestamp: "01/04/2025 9:44",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

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
