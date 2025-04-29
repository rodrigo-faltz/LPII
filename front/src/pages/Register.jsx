import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <main
      className="d-flex min-vh-100 align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(to bottom right, #EBF5FF, #FFFFFF)",
      }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
