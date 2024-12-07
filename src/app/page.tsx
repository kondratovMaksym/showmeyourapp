// import { Inputbar } from "@/components/Inputbar";
import Navbar from "@/components/Navbar";
import prisma from "@/prisma";

import styles from "@/styles/homePage.module.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    const userData = await prisma.user.findUnique({
      where: {
        user_id: user.id,
      },
    });
    if (userData === null) {
      await prisma.user.create({
        data: {
          username: `${user.family_name} ${user.given_name}`,
          user_id: user.id,
          user_picture: user.picture as string,
        },
      });
    }
    redirect(`/user/${userData?.id}`);
  } else {
    redirect("/user/1");
  }

  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
}
