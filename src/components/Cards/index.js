export function Card(props) {
  return (
    <>
      <div>
        <p>{props.name}</p>
        <p>{`Data: ${props.date}`}</p>
        <p>{`Descrição: ${props.content}`}</p>
        <p>{`Sentimento: ${props.feeling}`}</p>
        <p>{`Data de criação: ${props.creationDate}`}</p>
      </div>
    </>
  );
}
