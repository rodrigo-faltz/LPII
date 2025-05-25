import { Link } from "react-router-dom";
import { Chat } from "./../types";
import { formatDateTime } from "./../utils/formaters";

type ChatListProps = {
  chats: Chat[];
  emptyState: React.ReactNode;
  onDeleteChat?: (chatId: number) => void; 
};

export const ChatList = ({ chats, emptyState, onDeleteChat }: ChatListProps) => {
  if (chats.length === 0) return emptyState;

  return (
    <div className="card border-0 shadow-sm">
      <div className="list-group list-group-flush">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} onDeleteChat={onDeleteChat}/>
        ))}
      </div>
    </div>
  );
};

type ChatListItemProps = {
  chat: Chat;
  onDeleteChat?: (chatId: number) => void;
};

const ChatListItem = ({ chat, onDeleteChat }: ChatListItemProps) => (
  <div className="list-group-item list-group-item-action p-3 border-bottom position-relative">
    {/* Remover a primeira div com o título e manter apenas o conteúdo principal */}
    <div className="d-flex w-100 justify-content-between align-items-center">
      <div className="flex-grow-1">
        {/* Mensagem truncada */}
        <p className="mb-1 text-truncate chat-message-truncate text-dark" 
           style={{ fontWeight: 'bold', fontSize: '1.20rem' }}>
          {chat.ultimaMensagem}
        </p>
        {/* Badge com matéria */}
        <span className="badge bg-light text-primary">{chat.materia}</span>
      </div>

      {/* Botão de excluir */}
      {onDeleteChat && (
        <button
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.confirm("Tem certeza que deseja excluir esta conversa?")) {
              onDeleteChat(Number(chat.id));
            }
          }}
          style={{ zIndex: 100 }}
        >
          Excluir
        </button>
      )}
    </div>
    
    <Link
      to={`/home/chat/${chat.id}`}
      className="stretched-link"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.btn-outline-danger')) {
          e.preventDefault();
        }
      }}
    />
  </div>
);
