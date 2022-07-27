import { Link } from "react-router-dom";

export function Card(props) {
  console.log(props);
  return (
    <>
      <div>
        <p>{props.owner.name}</p>
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
