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

  handleChats = async () => {
    try {
      this.setState({ loading: true, error: null });
      const userChatsRes = await axios.get(
        `/chat/user/${localStorage.getItem("userId")}`
      );
      const chats = userChatsRes.data;

      const chatsData = await Promise.all(
        chats.map((chat) => this.fetchChatData(chat))
      );

      const validChats = chatsData.filter((chat) => chat !== null);

      this.setState({ chats: validChats });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Erro ao carregar históricos"
        : "Erro inesperado";

      this.setState({ error: errorMessage });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.handleChats();
  }

  render() {
    const { chats, loading, error, materiaFilter } = this.state;

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
              {/* Mostrar qual filtro está aplicado (opcional) */}
              {materiaFilter && (
                <div className="alert alert-info mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Filtrando por: <strong>{materiaFilter}</strong></span>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        window.history.pushState({}, '', '/home/historico');
                        this.setState({ materiaFilter: null });
                      }}
                    >
                      Limpar filtro
                    </button>
                  </div>
                </div>
              )}
              
              {/* Código de loading e error existente... */}

              {!loading && !error && (
                <HistoryChat 
                  chats={chats} 
                  initialFilter={materiaFilter || "todas"} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
