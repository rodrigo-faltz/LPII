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
      response: "",
    };

    // Configuração do Axios
    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    this.allChats = [];
  }

  handleChats = async (e) => {
    try {
      const res = await axios.get(
        `/chat/user/${localStorage.getItem("userId")}`
      );
      const data = res.data;
      this.allChats = [];
      this.allChats.push(...data.subject_id);
      console.log(this.allChats);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagemBackend =
          error.response?.data?.message || "Erro inesperado.";
        this.setState({ response: `Erro: ${mensagemBackend}` });
      } else {
        this.setState({ response: "Erro inesperado." });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.handleChats();
    console.log(this.allChats);
  }

  render() {
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
              <HistoryChat chats={this.allChats}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
