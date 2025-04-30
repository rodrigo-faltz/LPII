import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <header className="d-flex justify-content-end p-3 border-bottom">
      <div className="dropdown">
        <button
          className="btn btn-link text-decoration-none p-0 dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Perfil"
            className="rounded-circle"
            width="40"
            height="40"
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link to="/perfil" className="dropdown-item">
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link to="/configuracoes" className="dropdown-item">
              Configurações
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/" className="dropdown-item">
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
