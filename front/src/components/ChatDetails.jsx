import { Search, Paperclip, Trash2 } from "lucide-react";

export default function ChatDetails({ activeChat }) {
  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="text-center mb-4">
        <div className="chat-icon-large mb-2">{activeChat.icon}</div>
        <h4>{activeChat.title}</h4>
        <p className="text-muted">{activeChat.date}</p>
      </div>

      <div className="d-grid gap-2 mb-3">
        <button className="btn btn-dark">Ver Histórico</button>
      </div>

      <div className="list-group">
        <button className="list-group-item list-group-item-action d-flex align-items-center">
          <Search className="me-3" size={18} />
          Buscar
        </button>
        <button className="list-group-item list-group-item-action d-flex align-items-center">
          <Paperclip className="me-3" size={18} />
          Anexar
        </button>
        <button className="list-group-item list-group-item-action d-flex align-items-center text-danger">
          <Trash2 className="me-3" size={18} />
          Apagar chat
        </button>
      </div>
    </div>
  );
}
