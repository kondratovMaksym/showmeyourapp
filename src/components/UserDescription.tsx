"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/userdescription.module.css";

interface UserDescriptionProps {
  content?: string | null;
}

const UserDescription: React.FC<UserDescriptionProps> = ({ content }) => {
  const userDescriptionRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (userDescriptionRef.current) {
        const element = userDescriptionRef.current;

        setIsScrollable(element.scrollHeight > element.offsetHeight);
      }
    };

    if (userDescriptionRef.current) {
      checkScrollable();
    }

    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, [content]);

  return (
    <div
      ref={userDescriptionRef}
      className={`${styles.userDescription} ${
        isScrollable ? "" : styles.noScroll
      }`}
    >
      {content || "No description provided." /* Защита от undefined */}
    </div>
  );
};

export default UserDescription;
