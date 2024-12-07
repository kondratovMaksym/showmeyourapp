"use client";
import handleDelete from "@/functions/handleDelete";
import styles from "@/styles/deleteBtn.module.css";
//
interface Site {
  id: number;
  link: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  userId: number;
}

interface DeleteBtnProps {
  site: Site;
}

const DeleteBtn = ({ site }: DeleteBtnProps) => {
  return (
    <div className={styles.deleteSite}>
      <button
        onClick={() => handleDelete({ site })}
        className={styles.deleteBtn}
      >
        x
      </button>
    </div>
  );
};

export default DeleteBtn;
