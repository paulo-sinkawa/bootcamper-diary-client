import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function Home() {
  return (
    <>
      <div>
        <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
      </div>
      <div>
        <span>
          FAÇA
          <Link to="/login"> LOGIN </Link>
          ou
          <Link to="/signup">CADASTRE-SE</Link>
        </span>
      </div>
    </>
  );
}
