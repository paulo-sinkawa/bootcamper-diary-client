import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";

export function CreateComment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    text: "",
  });

  const [post, setPost] = useState({
    date: "",
    content: "",
    feeling: "",
  });

  const { postId } = useParams();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/post/my-posts/${postId}`);

        setPost(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/comment/create/${postId}`, form);

      navigate(`/my-posts/${postId}`);
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
      <p>{post.date}</p>
      <p>{post.content}</p>
      <p>{post.feeling}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="formComment">Comentário:</label>
        <textarea
          id="formComment"
          name="text"
          type="text"
          value={form.text}
          onChange={handleChange}
        />
        <button type="submit">CRIAR COMENTÁRIO</button>
      </form>
    </>
  );
}
