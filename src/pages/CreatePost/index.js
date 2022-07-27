import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    content: "",
    feeling: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/post/create", form);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formDate">Data</label>
        <input
          id="formDate"
          name="date"
          type="text"
          value={form.date}
          onChange={handleChange}
        />
        <label htmlFor="formContent">Conteúdo</label>
        <textarea
          id="formContent"
          name="content"
          type="text"
          value={form.content}
          onChange={handleChange}
        />
        <label htmlFor="formFeeling">Sentimento</label>
        <select
          id="formFeeling"
          name="feeling"
          type="text"
          value={form.feeling}
          onChange={handleChange}
        >
          <option>Orgulhoso</option>
          <option>Motivado</option>
          <option>Feliz</option>
          <option>Normal</option>
          <option>Preocupado</option>
          <option>Frustrado</option>
          <option>Desesperado</option>
        </select>
        <button type="submit">CRIAR POST</button>
      </form>
    </>
  );
}
