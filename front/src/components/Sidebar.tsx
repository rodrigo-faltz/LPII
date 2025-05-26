import { Link } from "react-router-dom";
import React from "react";

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const Sidebar = ({ activeNav, setActiveNav }: SidebarProps) => {
  const navItems = [
    //{ id: "inicio", icon: "bi-house-door", label: "Início" },
    { id: "explorar", icon: "bi-search", label: "Explorar" },
    //{ id: "chat", icon: "bi-chat-left-text", label: "Novo Chat" },
    { id: "historico", icon: "bi-clock-history", label: "Histórico" },
  ];

  return (
    <div className="col-3 sidebar bg-light border-end sidebar-container">
      <div className="d-flex flex-column h-100">
        <div className="p-3 border-bottom">
          <h4 className="fw-bold">Stud.IA</h4>
        </div>

        <div className="p-3 border-bottom flex-grow-1">
          <p className="text-muted mb-2 small fw-medium">Descobrir</p>
          <ul className="nav flex-column">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <Link
                  to={`/home/${item.id === "inicio" ? "" : item.id}`}
                  className={`nav-link d-flex align-items-center py-2 ${
                    activeNav === item.id
                      ? "active text-primary fw-semibold"
                      : "text-dark"
                  }`}
                  onClick={() => setActiveNav(item.id)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <i className={`bi ${item.icon} me-3`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
