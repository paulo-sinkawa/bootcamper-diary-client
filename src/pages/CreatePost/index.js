import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useState } from "react";

export function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    content: "",
    feeling: "",
  });
  console.log(form);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/post/create", form);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
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
        <button type="submit">SALVAR POST</button>
      </form>
    </>
  );
}
