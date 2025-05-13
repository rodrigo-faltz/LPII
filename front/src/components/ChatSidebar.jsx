import { useState } from "react";
import { Search, Home } from "lucide-react";

const chats = [
  { id: 1, title: "Matemática",  icon: "📐" },
  { id: 2, title: "Português",  icon: "📚" },
  { id: 3, title: "Física",  icon: "⚛️" },
  { id: 4, title: "Química",  icon: "🧪" },
  { id: 5, title: "Atualidades",  icon: "📰" },
  { id: 6, title: "Biologia", icon: "🧬" },
  { id: 7, title: "Sociologia",  icon: "👥" },
  { id: 8, title: "Geografia",  icon: "🌎" },
  { id: 9, title: "Filosofia",  icon: "🧠" },
];

export default function ChatSidebar({ activeChat, setActiveChat }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <button
          onClick={() => (window.location.href = "/home")}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center"
          aria-label="Voltar para o início"
        >
          <Home size={16} className="me-1" /> Início
        </button>
        <h4 className="m-0">Chats</h4>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control bg-light border-start-0"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="chat-list overflow-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item d-flex align-items-center p-2 mb-2 rounded ${
              activeChat.id === chat.id ? "active-chat" : ""
            }`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="chat-icon me-2">{chat.icon}</div>
            <div>
              <div className="chat-title">{chat.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
