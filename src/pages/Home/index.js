import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Card } from "../../components/Cards";

export function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const response = await api.get("/post/all-posts");
      console.log(response.data);
      setPost([...response.data]);
    }
    fetchPost();
  }, []);

  console.log(post);

  return (
    <>
      <div>
        <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
      </div>
      <div className={styles.loginn}>
        <span>
          FAÇA <Link to="/login"> LOGIN</Link> OU{" "}
          <Link to="/signup">CADASTRE-SE</Link>
        </span>
      </div>
      <div className={styles.divbutton}>
        <Link to="/create-post">
          <button className={styles.button1}>CRIE UM POST</button>
        </Link>
      </div>
      {post.map((currentPost) => {
        return (
          <div key={currentPost._id}>
            <Card
              owner={currentPost.name}
              date={currentPost.date}
              content={currentPost.content}
              feeling={currentPost.feeling}
              creationDate={currentPost.creationDate}
            />
          </div>
        );
      })}
    </>
  );
}
