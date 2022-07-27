import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function MyPosts() {
  const [post, setPost] = useState({});
  const { id } = useParams();

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
  console.log(post);
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

      <Link to={`/update-post/${id}`}>
        <button>Editar Post</button>
      </Link>
      <Link to={`/create-comment/${id}`}>
        <button>Adicionar Comentario</button>
      </Link>
    </>
  );
}
