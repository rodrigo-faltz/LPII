import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  axios.defaults.baseURL = "http://localhost:3000/api";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    try {
      setLoading(true);
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });
      const data = await res.data;
      //setResponse(JSON.stringify(data, null, 2));
      localStorage.setItem("token", data.token);
      //setResponse("Login realizado com sucesso! Redirecionando...");
      window.location.href = "/home";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagemBackend =
          error.response?.data?.message || "Erro inesperado.";
        setResponse(`Erro: ${mensagemBackend}`);
      } else {
        setResponse("Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h3
            className="card-title text-center fw-bold"
            style={{ color: "#1a56db" }}
          >
            Entrar
          </h3>
          <p className="text-center text-muted small">
            Acesse sua conta para continuar
          </p>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label fw-medium"
                style={{ color: "#1e429f" }}
              >
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="seu@email.com"
                required
                style={{ borderColor: "#bfdbfe" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label
                  htmlFor="password"
                  className="form-label mb-0 fw-medium"
                  style={{ color: "#1e429f" }}
                >
                  Senha
                </label>
              </div>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Senha"
                  required
                  style={{ borderColor: "#bfdbfe" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 top-0 h-100 text-muted border-0"
                  onClick={togglePasswordVisibility}
                  style={{ backgroundColor: "transparent" }}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                  <span className="visually-hidden">
                    {showPassword ? "Esconder senha" : "Mostrar senha"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 mt-2 fw-medium py-2"
              style={{ backgroundColor: "#2563eb", color: "white" }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>

            <div className="text-center mt-4">
              <span className="small text-muted">Não tem uma conta? </span>
              <Link
                to="/criar-conta"
                className="text-decoration-none small"
                style={{ color: "#2563eb" }}
              >
                Criar nova conta
              </Link>
            </div>
          </form>
          {response && (
            <div className="mt-3 p-3 bg-light rounded">
              <pre>{response}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginForm;
