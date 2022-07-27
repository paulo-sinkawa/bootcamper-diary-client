import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api/api";

export function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    content: "",
    feeling: "",
  });

  useEffect(() => {
    async function fetchPost() {
      const response = await api.get(`/post/my-posts/${id}`);
      console.log(response.data);
      setForm({ ...response.data });
    }
    fetchPost();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      console.log(clone);

      await api.patch(`/post/edit/${id}`, clone);

      navigate(`/my-posts/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/post/delete/${id}`);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formDate">Data:</label>
        <input
          id="formDate"
          name="date"
          type="text"
          value={form.date}
          onChange={handleChange}
        ></input>
        <label htmlFor="formContent">Conteúdo:</label>
        <input
          id="formContent"
          name="content"
          type="text"
          value={form.content}
          onChange={handleChange}
        ></input>
        <label htmlFor="formFeeling">Sentimento:</label>
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

        <button type="submit">SALVAR EDIÇÃO</button>
        <Link to="/">
          <button onClick={handleDelete}>
            DELETAR POST E SEUS COMENTÁRIOS
          </button>
        </Link>
      </form>
    </>
  );
}
