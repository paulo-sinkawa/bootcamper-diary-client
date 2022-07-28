import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function UpdateComment() {
  const [comment, setComment] = useState({
    text: "",
  });

  const { commentId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await api.get(`/comment/my-comment/${commentId}`);

        setComment({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchComment();
  }, []);

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...comment };
      delete clone._commentId;

      const response = await api.patch(
        `/comment/edit/${comment.post}/${commentId}`,
        clone
      );

      navigate(`/my-posts/${comment.post}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/comment/delete/${commentId}`);
      navigate(`/my-posts/${comment.post}`);
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
        <button onClick={handleLogOut} className={styles.buttonLogoff}>
          SAIR
        </button>
      </div>
      <div>Testando a pagina UpdateComment</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formText">Comentário: </label>
        <textarea
          is="formText"
          name="text"
          type="text"
          value={comment.text}
          onChange={handleChange}
        />
        <button type="submit">SALVAR COMENTÁRIO</button>
        <button onClick={handleDelete}>EXCLUIR COMENTÁRIO</button>
      </form>
    </>
  );
}
