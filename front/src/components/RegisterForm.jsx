import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h3
            className="card-title text-center fw-bold"
            style={{ color: "#1a56db" }}
          >
            Criar nova conta
          </h3>
          <p className="text-center text-muted small">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>
        <div className="card-body p-4">
          <form>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label fw-medium"
                style={{ color: "#1e429f" }}
              >
                Nome completo
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Seu nome completo"
                required
                style={{ borderColor: "#bfdbfe" }}
              />
            </div>

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
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-medium"
                style={{ color: "#1e429f" }}
              >
                Senha
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Senha"
                  required
                  style={{ borderColor: "#bfdbfe" }}
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
              <div className="form-text">
                A senha deve ter pelo menos 8 caracteres
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="form-label fw-medium"
                style={{ color: "#1e429f" }}
              >
                Confirmar senha
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Senha"
                  required
                  style={{ borderColor: "#bfdbfe" }}
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 top-0 h-100 text-muted border-0"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ backgroundColor: "transparent" }}
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                  <span className="visually-hidden">
                    {showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheck"
                required
              />
              <label className="form-check-label small" htmlFor="termsCheck">
                Concordo com os{" "}
                <Link
                  to="/termos"
                  className="text-decoration-none"
                  style={{ color: "#2563eb" }}
                >
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link
                  to="/privacidade"
                  className="text-decoration-none"
                  style={{ color: "#2563eb" }}
                >
                  política de privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 mt-2 fw-medium py-2"
              style={{ backgroundColor: "#2563eb", color: "white" }}
            >
              Criar conta
            </button>

            <div className="text-center mt-4">
              <span className="small text-muted">Já tem uma conta? </span>
              <Link
                to="/"
                className="text-decoration-none small"
                style={{ color: "#2563eb" }}
              >
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
