import { Dropdown } from "react-bootstrap";
import { logout } from "../services/auth";
import axios from "axios";
import React from "react";

interface HeaderState {
  loading: boolean;
  username: string;
  error: string;
}

class Header extends React.Component<{}, HeaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      error: "",
    };

    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile = async () => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(`/auth/profile`);
      this.setState({ username: res.data.username });
      localStorage.setItem("userId", res.data.id);
    } catch (error) {
      this.setState({
        error: axios.isAxiosError(error)
          ? error.response?.data?.message || "Erro inesperado."
          : "Erro inesperado.",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  render() {
    return (
      <header className="d-flex justify-content-end p-3 border-bottom align-items-center">
        <div className="me-3">
          {this.state.loading ? (
            <div
              className="spinner-border spinner-border-sm text-secondary"
              role="status"
            />
          ) : (
            <span className="text-dark fw-medium">{this.state.username}</span>
          )}
        </div>

        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-profile"
            className="text-decoration-none p-0 d-flex align-items-center"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Perfil"
              className="rounded-circle"
              width="35"
              height="35"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-end">
            <Dropdown.Item onClick={this.handleLogout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
    );
  }
}

export default Header;
