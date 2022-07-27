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

  console.log(loggedInUser);

  return (
    <>
      <div>
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
          <button onClick={handleLogOut} className={styles.buttonLogoff}>
            SAIR
          </button>
        </Link>
      </div>
      <p>Nome: {loggedInUser.user.name}</p>
      <img src={loggedInUser.user.img} />
      <p>E-mail: {loggedInUser.user.email}</p>
      <p>Idade: {loggedInUser.user.age}</p>
      <Link to="/update-profile">EDITAR PERFIL</Link>
    </>
  );
}
