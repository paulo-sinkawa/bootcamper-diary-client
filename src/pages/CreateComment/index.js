import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";

export function CreateComment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    text: "",
  });
  console.log(form);

  const [post, setPost] = useState({});
  const { postId } = useParams();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/post/my-posts/${postId}`);
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
      const response = await api.post(`/comment/create/${postId}`, form);
      console.log(response);
      navigate(`/my-posts/${postId}`);
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
