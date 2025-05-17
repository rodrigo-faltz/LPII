import React from "react";
import Sidebar from "../components/Sidebar";
import HistoryChat from "../components/HistoryChat";
import Header from "../components/Header";
import axios from "axios";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "historico",
      loading: false,
      chats: [],
      error: null,
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

      const messages = messagesRes.data;
      const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;

      return {
        id: chat.id,
        materia: subjectRes.data.name,
        dataHora: lastMessage ? lastMessage.created_at : chat.created_at,
        ultimaMensagem: lastMessage
          ? lastMessage.content
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
    const { chats, loading, error } = this.state;

    return (
      <div className="container-fluid p-0">
        <div className="row g-0">
          <Sidebar
            activeNav={this.state.activeNav}
            setActiveNav={(newNav) => this.setState({ activeNav: newNav })}
          />

          <div className="col main-content">
            <Header />

            <div className="container-fluid p-4">
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error} -{" "}
                  <button onClick={this.handleChats} className="btn btn-link">
                    Tentar novamente
                  </button>
                </div>
              )}

              {!loading && !error && <HistoryChat chats={chats} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
