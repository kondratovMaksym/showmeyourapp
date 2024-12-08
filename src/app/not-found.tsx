import styles from "../styles/notfound.module.css";
import Link from "next/link"; // Импортируем Link для навигации

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page is not found</p>
      {/*  */}
      <Link href="/" passHref>
        <button className={styles.homeButton}>Return</button>
      </Link>
    </div>
  );
};

export default NotFound;
