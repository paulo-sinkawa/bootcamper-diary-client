import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

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
      <div>pagina create-comment funcionando</div>
      <p>{post.content}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="formComment">Comentário:</label>
        <textarea
          id="formComment"
          name="comment"
          type="text"
          value={form.comment}
          onChange={handleChange}
        />
        <Link to="/">
          <button type="submit">CRIAR COMENTÁRIO</button>
        </Link>
      </form>
    </>
  );
}
