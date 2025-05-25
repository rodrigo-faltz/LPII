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

    // Aplicar filtro por matéria
    if (filterValue !== "todas") {
      console.log("Aplicando filtro:", filterValue);
      result = result.filter(chat => 
        chat.materia && chat.materia.toLowerCase() === filterValue.toLowerCase()
      );
    }

    // Aplicar pesquisa por termo
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (chat) =>
          (chat.materia && chat.materia.toLowerCase().includes(term)) ||
          (chat.ultimaMensagem && chat.ultimaMensagem.toLowerCase().includes(term))
      );
    }

    // Aplicar ordenação
    result.sort((a, b) => {
      const dateA = new Date(a.dataHora).getTime();
      const dateB = new Date(b.dataHora).getTime();
      return sortValue === "recentes" ? dateB - dateA : dateA - dateB;
    });

    setFilteredChats(result);
  }, [chats, searchTerm, filterValue, sortValue]);

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
