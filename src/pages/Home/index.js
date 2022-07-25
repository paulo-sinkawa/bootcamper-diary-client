import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function Home() {
  return (
    <>
      <div>
        <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
      </div>
      <div className={styles.loginn}>
        <span>
          FAÇA
          <Link to="/login"> LOGIN </Link>
          OU 
          <Link to="/signup"> CADASTRE-SE</Link>
        </span>        
      </div>
      <div className={styles.divbutton}>
        <button to="/" className={styles.button1}>
          CRIE UM POST
       </button> 
      </div>     
    </>
  );
}
