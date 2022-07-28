import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

export function Card(props) {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <>
      <div>
        <p>{`Nome: ${props.owner}`}</p>
        <img src={loggedInUser.user.img} alt="" />
        <p>{`Data: ${props.date}`}</p>
        <p>{`Descrição: ${props.content}`}</p>
        <p>{`Sentimento: ${props.feeling}`}</p>
        <p>{`Data de criação: ${props.creationDate}`}</p>
        <Link to={`/my-posts/${props.id}`}>
          <button>Veja seu post</button>
        </Link>
      </div>
    </>
  );
}
