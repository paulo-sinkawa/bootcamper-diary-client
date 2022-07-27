import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";

export function CreateComment() {
  const [form, setForm] = useState({
    text: "",
  });

  const [post, setPost] = useState({});
  const { id } = useParams();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/post/my-posts/${id}`);
        console.log(response.data);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/comment/create/:postId", form);
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
      <p>{post.date}</p>
      <p>{post.content}</p>
      <p>{post.feeling}</p>
      <p>{post.owner}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="formComment">Comentário:</label>
        <textarea
          id="formComment"
          name="comment"
          type="text"
          value={form.comment}
          onChange={handleChange}
        />
        <Link to={`/my-posts/${id}`}>
          <button type="submit">CRIAR COMENTÁRIO</button>
        </Link>
      </form>
    </>
  );
}
