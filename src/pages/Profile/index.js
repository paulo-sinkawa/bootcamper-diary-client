import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export function Profile() {
  // const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await api.get("/user/profile");
  //     setUser(response.data);
  //   }

  //   fetchUser();
  // }, []);

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      <div>
        <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
      </div>
      <h1>{loggedInUser.user.name}</h1>
      <p>{loggedInUser.user.email}</p>
      <Link to="/update-profile">EDITAR PERFIL</Link>
      <button onClick={handleLogOut}>SAIR</button>
    </>
  );
}
