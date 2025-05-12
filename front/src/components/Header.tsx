import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="d-flex justify-content-end p-3 border-bottom">
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
            width="40"
            height="40"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
};

export default Header;
