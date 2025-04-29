import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <main
      className="d-flex min-vh-100 align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(to bottom right, #EBF5FF, #FFFFFF)",
      }}
    >
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
