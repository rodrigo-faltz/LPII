import { useEffect, useState } from "react";
import { Chat } from "../types";

type UseChatFiltersProps = {
  initialChats: Chat[];
  defaultFilter?: string;
};

export const useChatFilters = ({
  initialChats,
  defaultFilter = "todas",
}: UseChatFiltersProps) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [filteredChats, setFilteredChats] = useState<Chat[]>(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState(defaultFilter);
  const [sortValue, setSortValue] = useState<"recentes" | "antigos">(
    "recentes"
  );

  useEffect(() => {
    let result = [...chats];

    // Filtragem
    if (filterValue !== defaultFilter) {
      result = result.filter((chat) => chat.materia === filterValue);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (chat) =>
          chat.titulo?.toLowerCase().includes(term) ||
          chat.ultimaMensagem.toLowerCase().includes(term)
      );
    }

    // Ordenação
    result.sort((a, b) => {
      const dateA = new Date(a.dataHora).getTime();
      const dateB = new Date(b.dataHora).getTime();
      return sortValue === "recentes" ? dateB - dateA : dateA - dateB;
    });

    setFilteredChats(result);
  }, [chats, searchTerm, filterValue, sortValue, defaultFilter]);

  return {
    filteredChats,
    searchTerm,
    filterValue,
    sortValue,
    setChats,
    setSearchTerm,
    setFilterValue,
    setSortValue,
  };
};
