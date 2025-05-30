import React from "react";
import Sidebar from "../components/Sidebar";
import HistoryChat from "../components/HistoryChat";
import Header from "../components/Header";
import axios from "axios";

class History extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(window.location.search);
    const materiaFilter = params.get('materia');

    this.state = {
      activeNav: "historico",
      loading: false,
      chats: [],
      error: null,
      materiaFilter: materiaFilter
    };

    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  fetchChatData = async (chat) => {
    try {
      const [subjectRes, messagesRes] = await Promise.all([
        axios.get(`/subject/${chat.subject_id}`),
        axios.get(`/message/chat/${chat.id}`),
      ]);

      const truncateMessage = (message, maxLength = 80) => {
      if (!message) return "";
      return message.length > maxLength 
        ? message.substring(0, maxLength) + "..." 
        : message;
      };

      const messages = messagesRes.data;
      const lastMessage =
        messages.length > 0 ? messages[1] : null;

      return {
        id: chat.id,
        materia: subjectRes.data.name,
        dataHora: lastMessage ? lastMessage.created_at : chat.created_at,
        ultimaMensagem: lastMessage 
        ? truncateMessage(lastMessage.content) 
        : "Nenhuma mensagem ainda",
      };
    } catch (error) {
      console.error(`Erro ao carregar chat ${chat.id}:`, error);
      return null;
    }
  };

    getFilteredChats = () => {
      const { chats, materiaFilter } = this.state;
      
      if (!materiaFilter || materiaFilter === "todas") {
        return chats;
      }

      return chats.filter(chat => 
        chat.materia && chat.materia.toLowerCase() === materiaFilter.toLowerCase()
      );
    };

  getFilterOptions = () => {
    const { chats } = this.state;
    
    if (!Array.isArray(chats) || chats.length === 0) {
      return ["todas"];
    }
    
    const materias = new Set(
      chats
        .map(chat => chat.materia)
        .filter(materia => Boolean(materia))
    );
    
    return ["todas", ...Array.from(materias)].sort();
  };

  handleFilterChange = (newFilter) => {
    this.setState({ materiaFilter: newFilter });
    
    // Update URL to reflect the filter
    const url = new URL(window.location);
    if (newFilter && newFilter !== "todas") {
      url.searchParams.set('materia', newFilter);
    } else {
      url.searchParams.delete('materia');
    }
    window.history.replaceState({}, '', url);
  };


  handleChats = async () => {
    try {
      this.setState({ loading: true, error: null });
      const userChatsRes = await axios.get(
        `/chat/user/${localStorage.getItem("userId")}`
      );
      const chats = userChatsRes.data;
      
      console.log("Dados recebidos do servidor:", chats); // Para debug
      
      // Verificar se chats é um array válido
      if (!chats || !Array.isArray(chats) || chats.length === 0) {
        this.setState({ chats: [], loading: false });
        return;
      }
      
      const chatsData = await Promise.all(
        chats.map((chat) => this.fetchChatData(chat))
      );
    
      const validChats = chatsData.filter((chat) => chat !== null);
      this.setState({ chats: validChats, loading: false });
    } catch (error) {
      console.error("Erro ao carregar chats:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Erro ao carregar históricos"
        : "Erro inesperado";
    
      this.setState({ error: errorMessage, loading: false });
    }
  };

  handleDeleteChat = async (chatId) => {
    if (!chatId) return;
    
    try {
      this.setState({ loading: true });
      
      // Primeiro, excluir todas as mensagens associadas ao chat
      const messagesRes = await axios.get(`/message/chat/${chatId}`);
      if (messagesRes.data && messagesRes.data.length > 0) {
        console.log(`Excluindo ${messagesRes.data.length} mensagens do chat ${chatId}`);
        await Promise.all(
          messagesRes.data.map(message => 
            axios.delete(`/message/${message.id}`)
          )
        );
      }
      
      // Em seguida, excluir o chat
      await axios.delete(`/chat/${chatId}`);
      console.log(`Chat ${chatId} excluído com sucesso`);
      
      // Atualizar a lista de chats
      this.handleChats();
    } catch (error) {
      console.error("Erro ao excluir chat:", error);
      alert("Não foi possível excluir o chat. Por favor, tente novamente.");
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.handleChats();
  }

  render() {
    const { loading, error, materiaFilter } = this.state;
    const filteredChats = this.getFilteredChats();
    const filterOptions = this.getFilterOptions();

    return (
      <div className="container-fluid p-0 vh-100">
        <div className="row g-0 h-100">
          <Sidebar
            activeNav={this.state.activeNav}
            setActiveNav={(newNav) => this.setState({ activeNav: newNav })}
          />

          <div className="col main-content d-flex flex-column h-100">
            <Header />

            <div className="container-fluid p-4 flex-grow-1 overflow-auto">
                <HistoryChat 
                  chats={filteredChats}
                  filterOptions={filterOptions}
                  currentFilter={materiaFilter || "todas"}
                  onFilterChange={this.handleFilterChange}
                  onDeleteChat={this.handleDeleteChat}
                  loading={loading}
                  error={error}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
