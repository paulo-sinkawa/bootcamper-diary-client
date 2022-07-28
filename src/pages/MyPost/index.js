import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function MyPosts() {
  const [post, setPost] = useState({
    content: "",
    creationDate: "",
    date: "",
    feeling: "",
    owner: {
      age: "",
      carrerMigration: "",
      name: "",
    },
    comment: [
      {
        text: "",
      },
    ],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/post/my-posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, []);

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
      <p>Nome: {post.owner.name}</p>
      <p>Data: {post.date}</p>
      <p>Conteúdo: {post.content}</p>
      <p>Sentimento: {post.feeling}</p>
      <Link to={`/update-post/${id}`}>
        <button>EDITAR POST</button>
      </Link>
      <Link to={`/create-comment/${id}`}>
        <button>ADICIONAR COMENTÁRIO</button>
      </Link>

      <p>Comentários:</p>
      {post.comment.map((currentPost, i) => {
        return (
          <div key={i}>
            <p>{currentPost.text}</p>
            <Link to={`/update-comment/${currentPost._id}`}>
              <button>EDITAR COMENTÁRIO</button>
            </Link>
          </div>
        );
      })}
    </>
  );
}
