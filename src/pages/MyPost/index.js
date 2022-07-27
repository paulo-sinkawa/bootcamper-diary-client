import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Card } from "../../components/Cards";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <div>{post.content}</div>

      <Link to={`/update-post/${id}`}>
        <button>Editar Post</button>
      </Link>
      <button>Adicionar Comentario</button>
    </>
  );
}
