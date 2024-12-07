import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "@/styles/editPage.module.css";
import { revalidatePath } from "next/cache";

const page = async ({ params }: { params: { id: string } }) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();
  const toNumberId = Number(params.id);
  if (isNaN(toNumberId)) {
    if (isLoggedIn) {
      const fitUser = await prisma.user.findUnique({
        where: {
          user_id: user.id,
        },
      });
      redirect(`/user/${fitUser?.id}`);
    }
    redirect(`/`);
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: toNumberId,
    },
  });
  if (userData === null) {
    redirect(`/`);
  }

  if (userData?.user_id !== user?.id) {
    redirect(`/user/${userData?.id}`);
  }

  const editProfile = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    const twitter = formData.get("twitter");
    const linkedin = formData.get("linkedin");
    const instagram = formData.get("instagram");
    const telegram = formData.get("telegram");
    const youtube = formData.get("youtube");
    const description = formData.get("description");

    await prisma.user.update({
      where: {
        id: toNumberId,
      },
      data: {
        username: username as string,
        user_x: twitter as string,
        user_linkedin: linkedin as string,
        user_instagram: instagram as string,
        user_telegram: telegram as string,
        user_youtube: youtube as string,
        user_description: description as string,
      },
    });

    revalidatePath(`/user/${userData.id}`);
    redirect(`/user/${userData.id}`);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>Edit Profile</div>
        <div className={styles.inputForm}>
          <form action={editProfile}>
            <label className={styles.label}>Username:</label>
            <input
              required
              name="username"
              className={styles.input}
              type="text"
              defaultValue={userData.username}
              maxLength={100}
            />

            <label className={styles.label}>Twitter(X) Link:</label>
            <input
              name="twitter"
              className={styles.input}
              type="url"
              defaultValue={userData.user_x || ""}
            />

            <label className={styles.label}>LinkedIn Link:</label>
            <input
              name="linkedin"
              className={styles.input}
              type="url"
              defaultValue={userData.user_linkedin || ""}
            />

            <label className={styles.label}>Instagram Link:</label>
            <input
              name="instagram"
              className={styles.input}
              type="url"
              defaultValue={userData.user_instagram || ""}
            />

            <label className={styles.label}>Telegram Link:</label>
            <input
              name="telegram"
              className={styles.input}
              type="url"
              defaultValue={userData.user_telegram || ""}
            />

            <label className={styles.label}>Youtube Link:</label>
            <input
              name="youtube"
              className={styles.input}
              type="url"
              defaultValue={userData.user_youtube || ""}
            />

            <label className={styles.labelTextArea}>Description:</label>

            <div className={styles.textAreaDiv}>
              <textarea
                name="description"
                rows={4}
                className={styles.textArea}
                defaultValue={userData.user_description || ""}
                maxLength={3000}
              />
            </div>

            <div className={styles.saveBtnDiv}>
              <button className={styles.saveBtn}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
