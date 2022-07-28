import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function UpdateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    img: "",
    carrerMigration: "",
  });

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

      setForm({ ...form, img: response.data });

      return response.data.url;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setForm({ ...response.data });
        console.log(response);
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

      const imgURL = await handleUpload();

      await api.patch("/user/update-profile", { clone, img: imgURL });

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
