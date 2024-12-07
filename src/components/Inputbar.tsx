"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/inputbar.module.css";
import Image from "next/image";
import photo from "@/images/icons8-favicon-50.png";
import Link from "next/link";

interface Site {
  id: number;
  link: string;
  name: string;
  icon?: string;
  description?: string;
  userId: number;
}

interface User {
  id: number;
  username: string;
  user_id: string;
  user_picture?: string | null;
  user_description?: string | null;
  user_linkedin?: string | null;
  user_x?: string | null;
  user_youtube?: string | null;
  user_instagram?: string | null;
  user_telegram?: string | null;
  sites?: Site[];
}

interface InputbarProps {
  users: User[];
}

export const Inputbar = ({ users }: InputbarProps) => {
  const [query, setQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Фильтрация пользователей на основе введенного текста
  useEffect(() => {
    if (query.length >= 3) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [query, users]);

  return (
    <div className={styles.container}>
      <div>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
        />
      </div>

      {filteredUsers.length > 0 && (
        <div className={styles.suggestions}>
          {filteredUsers.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className={styles.suggestionItem}>
                <Image
                  src={user.user_picture ? user.user_picture : photo}
                  alt={user.username}
                  className={styles.userAvatar}
                  width={30}
                  height={30}
                />
                <div className={styles.userInfo}>
                  <p>{user.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
