import { useState, useEffect } from "react";
import { ChatList } from "./ChatList";
import { SearchFilterBar } from "./Filter/SearchFilterBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { EmptyState } from "./EmptyState";
import { useChatFilters } from "./../hooks/useChatFilters";

const HistoricoChats = ({ chats = [], initialFilter = "todas", onDeleteChat }) => {
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
  } = useChatFilters({
    initialChats: [],
    defaultFilter: initialFilter
  });

  const fetchChats = () => {
    // Always treat chats as an array, even if empty
    const chatArray = Array.isArray(chats) ? chats : [];
    setChats(chatArray);
    setIsLoading(false);
  };

  // Safe filter options that don't depend on chat properties
  const filterOptions = ["todas"].sort();
  
  const sortOptions = [
    { value: "recentes", label: "Mais recentes" },
    { value: "antigos", label: "Mais antigos" },
  ];

  useEffect(() => {
    if (initialFilter && initialFilter !== filterValue) {
      console.log("Atualizando filtro para:", initialFilter);
      setFilterValue(initialFilter);
    }
  }, [initialFilter, filterValue, setFilterValue]);

  useEffect(() => {
    fetchChats();
  }, [chats]);

  return (
    <div className="container-fluid p-4">
      {/* Always show the header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Histórico de Conversas</h2>
      </div>

      {/* Always show the search bar */}
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

      {/* Conditional content based on loading state */}
      {isLoading ? (
        <LoadingIndicator message="Carregando seu histórico..." />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <ChatList
          chats={filteredChats}
          onDeleteChat={onDeleteChat}
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