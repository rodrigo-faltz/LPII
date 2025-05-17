import { useState, useEffect } from "react";
import { ChatList } from "./ChatList";
import { SearchFilterBar } from "./Filter/SearchFilterBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { EmptyState } from "./EmptyState";
import { useChatFilters } from "./../hooks/useChatFilters";

const HistoricoChats = ({ chats }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    filteredChats,
    searchTerm,
    filterValue,
    sortValue,
    setChats,
    setSearchTerm,
    setFilterValue,
    setSortValue,
  } = useChatFilters({ initialChats: [] });

  const fetchChats = () => {
    if (chats) {
      setChats(chats);
      setIsLoading(false);
    } else {
      setError("Erro ao carregar o histórico de conversas.");
      setIsLoading(false);
    }
  };

  const filterOptions = [
    "todas",
    ...(Array.from(new Set(chats.map((chat) => chat.materia))) as string[]),
  ].sort();
  const sortOptions = [
    { value: "recentes", label: "Mais recentes" },
    { value: "antigos", label: "Mais antigos" },
  ];

  useEffect(() => {
    fetchChats();
  }, [chats]);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Histórico de Conversas</h2>
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        sortValue={sortValue}
        onSortChange={(value: string) =>
          setSortValue(value as "recentes" | "antigos")
        }
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />

      {isLoading ? (
        <LoadingIndicator message="Carregando seu histórico..." />
      ) : (
        <ChatList
          chats={filteredChats}
          emptyState={
            <EmptyState
              searchTerm={searchTerm}
              filterValue={filterValue}
              onClearFilters={() => {
                setSearchTerm("");
                setFilterValue("todas");
              }}
            />
          }
        />
      )}
    </div>
  );
};

export default HistoricoChats;
