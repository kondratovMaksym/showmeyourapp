import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import styles from "@/styles/addPage.module.css";
import Navbar from "@/components/Navbar";
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

  const addSite = async (formData: FormData) => {
    "use server";
    const webLink = formData.get("link");
    const webName = formData.get("websiteName");
    const webIcon = formData.get("icon");
    const description = formData.get("description");

    await prisma.site.create({
      data: {
        link: webLink as string,
        name: webName as string,
        icon: webIcon as string,
        description: description as string,
        userId: userData.id,
      },
    });
    revalidatePath(`/user/${userData.id}`);
    redirect(`/user/${userData.id}`);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>Add Website</div>
        <div className={styles.inputForm}>
          <form action={addSite}>
            <div id="error-message" className={styles.errorMessage}></div>
            <label className={styles.label}>Website Name:</label>
            <input
              required
              name="websiteName"
              className={styles.input}
              type="text"
              maxLength={50}
            />

            <label className={styles.label}>Website Link:</label>
            <input required name="link" className={styles.input} type="url" />

            <label className={styles.label}>Website Icon Link:</label>
            <input name="icon" className={styles.input} type="url" />

            <label className={styles.labelTextArea}>Description:</label>

            <textarea
              name="description"
              rows={4}
              className={styles.textArea}
              maxLength={500}
            />

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
