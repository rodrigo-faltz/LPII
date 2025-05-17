import { Link } from "react-router-dom";
import { Chat } from "./../types";
import { formatDateTime } from "./../utils/formaters";

type ChatListProps = {
  chats: Chat[];
  emptyState: React.ReactNode;
};

export const ChatList = ({ chats, emptyState }: ChatListProps) => {
  if (chats.length === 0) return emptyState;

  return (
    <div className="card border-0 shadow-sm">
      <div className="list-group list-group-flush">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

type ChatListItemProps = {
  chat: Chat;
};

const ChatListItem = ({ chat }: ChatListItemProps) => (
  <Link
    to={`/home/chat/${chat.id}`}
    className="list-group-item list-group-item-action p-3 border-bottom"
  >
    <div className="d-flex w-100 justify-content-between align-items-center">
      <h5 className="mb-1">{chat.titulo}</h5>
      <small className="text-muted">{formatDateTime(chat.dataHora)}</small>
    </div>
    <div className="d-flex w-100 justify-content-between align-items-center">
      <p className="mb-1 text-truncate chat-message-truncate">
        {chat.ultimaMensagem}
      </p>
      <span className="badge bg-light text-primary">{chat.materia}</span>
    </div>
  </Link>
);
