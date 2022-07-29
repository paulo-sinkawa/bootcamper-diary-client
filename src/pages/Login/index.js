import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Login ou senha incorretos.");
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
        </Link>
      </div>
      <form onSubmit={handleSumit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Entrar!</button>
      </form>
    </>
  );
}
