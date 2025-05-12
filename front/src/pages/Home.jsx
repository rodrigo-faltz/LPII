import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SubjectsSection from "../components/SubjectsSection";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "inicio",
      favoriteSubjects: [],
      suggestedSubjects: [],
      loading: false,
      response: "",
    };

    // Configuração do Axios
    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    this.allSubjects = [];
  }

  handleSubjects = async (e) => {
    try {
      const res = await axios.get(`/subject/`);
      const data = res.data;
      //this.allSubjects = res.data.subjects;
      //console.log(this.allSubjects);
      this.allSubjects = [];
      this.allSubjects.push(...data.subjects);
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
    this.handleSubjects();
    //console.log(this.allSubjects);
  }

  render() {
    const favoriteSubjectsTest = [];
    const suggestedSubjectsTest = [];

    /* Dashboard Incomplete até se ter a API para favoritas e outras
       Por enquanto exibe tudo assim como será na aba explorar */
    
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
              <SubjectsSection
                title="Disciplinas favoritas"
                subjects={this.allSubjects}
                size="large"
                cols={{ default: 1, md: 2, lg: 4 }}
              />

              <SubjectsSection
                title="Veja também"
                subjects={this.allSubjects}
                size="small"
                cols={{ default: 1, md: 3, lg: 6 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
