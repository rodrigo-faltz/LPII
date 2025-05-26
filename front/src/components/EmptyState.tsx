import { Link } from "react-router-dom";

type EmptyStateProps = {
  searchTerm: string;
  filterValue: string;
  onClearFilters: () => void;
};

export const EmptyState = ({
  searchTerm,
  filterValue,
  onClearFilters,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-5">
      <i className="bi bi-chat-left-text empty-state-icon" />
      <p className="mt-3 text-muted">
        {searchTerm || filterValue !== "todas"
          ? "Nenhuma conversa encontrada com os filtros atuais."
          : "Você ainda não iniciou nenhuma conversa."}
      </p>
      {searchTerm || filterValue !== "todas" ? (
        <button
          className="btn btn-outline-primary mt-2"
          onClick={onClearFilters}
        >
          Limpar filtros
        </button>
      ) : (
        <Link to="/home/explorar" className="btn btn-primary mt-2">
          Iniciar uma conversa
        </Link>
      )}
    </div>
  );
};
