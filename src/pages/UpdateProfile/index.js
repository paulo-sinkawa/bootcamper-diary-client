import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function UpdateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    img: "",
    carrerMigration: "",
  });
  console.log(form);

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setForm({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      console.log(clone);

      await api.patch("/user/update-profile", clone);

      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete("/user/disable-profile");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
        </Link>
        <button onClick={handleLogOut} className={styles.buttonLogoff}>
          SAIR
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formName">Nome:</label>
        <input
          id="formName"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <label htmlFor="formImg">Sua foto de perfil:</label>
        <input type="file" id="formImg" onChange={handleImage} />
        <label htmlFor="age">Idade</label>
        <input
          id="age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Migração de Carreira</label>
        <input
          id="carrerMigrationYes"
          type="radio"
          name="carrerMigration"
          value={true}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Sim</label>
        <input
          id="carrerMigrationNo"
          type="radio"
          name="carrerMigration"
          value={false}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Não</label>

        <button type="submit">SALVAR PERFIL</button>
        <button onClick={handleDelete}>EXCLUIR PERFIL</button>
      </form>
    </>
  );
}
