import { useContext } from "react";
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
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
        </Link>
      </div>
      <p>{loggedInUser.user.name}</p>
      <p>{loggedInUser.user.email}</p>
      <p>Idade: {loggedInUser.user.age}</p>
      <p>{loggedInUser.user.carrerMigration}</p>
      <Link to="/update-profile">EDITAR PERFIL</Link>
      <button onClick={handleLogOut}>SAIR</button>
    </>
  );
}
