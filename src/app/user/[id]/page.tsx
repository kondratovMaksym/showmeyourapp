import Navbar from "@/components/Navbar";
import styles from "@/styles/userPage.module.css";
import prisma from "@/prisma";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import x from "@/images/icons8-twitterx-50.png";
import linkedin from "@/images/icons8-linkedin-50.png";
import youtube from "@/images/icons8-youtube-50.png";
import telegram from "@/images/icons8-telegram-50.png";
import instagram from "@/images/icons8-instagram-50.png";
import globus from "@/images/icons8-favicon-50.png";
import { redirect } from "next/navigation";
import DeleteBtn from "@/components/DeleteBtn";
import { Inputbar } from "@/components/Inputbar";
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
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: toNumberId,
    },
  });
  if (userData === null) {
    if (isLoggedIn) {
      const fitUser = await prisma.user.findUnique({
        where: {
          user_id: user.id,
        },
      });
      redirect(`/user/${fitUser?.id}`);
    }
    redirect(`/user/1`);
  }
  const userSites = await prisma.site.findMany({
    where: {
      userId: userData?.id,
    },
  });

  const users = await prisma.user.findMany();

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div>
          <Inputbar users={users} />
        </div>
        <div className={styles.content}>
          <div className={styles.userInfo}>
            <div className={styles.userInfoContent}>
              <div className={styles.userPicture}>
                {userData?.user_picture ? (
                  <Image
                    style={{ borderRadius: "50%", margin: "auto" }}
                    alt="User Profile"
                    width={100}
                    height={100}
                    src={userData?.user_picture}
                  />
                ) : (
                  <div className={styles.component}>
                    {userData?.username?.[0]}
                  </div>
                )}
              </div>
              <div className={styles.userNameInfo}>
                <> {userData?.username}</>
              </div>
              <div className={styles.userDescription}>
                {userData?.user_description?.length === 0 ? (
                  "No info provided."
                ) : (
                  <>{userData?.user_description}</>
                )}
              </div>
              <div className={styles.userLinks}>
                {userData?.user_instagram && (
                  <Link
                    className={styles.link}
                    target="_blank"
                    href={userData?.user_instagram}
                  >
                    <Image
                      src={instagram}
                      width={30}
                      height={30}
                      alt="Instagram"
                      rel="noopener noreferrer"
                    />
                  </Link>
                )}

                {userData?.user_linkedin && (
                  <Link
                    className={styles.link}
                    target="_blank"
                    href={userData?.user_linkedin}
                  >
                    <Image
                      src={linkedin}
                      width={30}
                      height={30}
                      alt="LinkedIn"
                      rel="noopener noreferrer"
                    />
                  </Link>
                )}

                {userData?.user_telegram && (
                  <Link
                    className={styles.link}
                    target="_blank"
                    href={userData?.user_telegram}
                  >
                    <Image
                      src={telegram}
                      width={30}
                      height={30}
                      alt="Telegram"
                      rel="noopener noreferrer"
                    />
                  </Link>
                )}

                {userData?.user_youtube && (
                  <Link
                    className={styles.link}
                    target="_blank"
                    href={userData?.user_youtube}
                  >
                    <Image
                      src={youtube}
                      width={30}
                      height={30}
                      alt="YouTube"
                      rel="noopener noreferrer"
                    />
                  </Link>
                )}

                {userData?.user_x && (
                  <Link
                    className={styles.link}
                    target="_blank"
                    href={userData?.user_x}
                  >
                    <Image
                      src={x}
                      width={30}
                      height={30}
                      alt="Twitter(X)"
                      rel="noopener noreferrer"
                    />
                  </Link>
                )}
              </div>

              {userData?.user_id === user?.id && (
                <div className={styles.editBtns}>
                  <Link href={`/edit/${userData.id}`}>
                    <button className={styles.changeProfileBtn}>
                      Edit Profile
                    </button>
                  </Link>

                  <Link href={`/add/${userData.id}`}>
                    <button className={styles.addPostBtn}>Add Site</button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className={styles.userProjects}>
            <div className={styles.projects}>
              {userSites.length === 0 ? (
                <>
                  <div className={styles.noHeader}>
                    <>No sites yet...</>
                  </div>
                </>
              ) : (
                <>
                  {userSites.reverse().map((site) => (
                    <div
                      key={site.id}
                      className={
                        userData?.user_id === user?.id
                          ? styles.siteSquareBig
                          : styles.siteSquare
                      }
                    >
                      <Link target="_blank" href={site.link}>
                        <div className={styles.topPart}>
                          {site.icon ? (
                            <Image
                              className={styles.siteIcon}
                              src={site.icon}
                              alt={"Icon"}
                              width={30}
                              height={30}
                            />
                          ) : (
                            <Image
                              className={styles.siteIcon}
                              src={globus}
                              alt={"Icon"}
                              width={30}
                              height={30}
                            />
                          )}
                          {site.name}
                        </div>
                      </Link>

                      <div className={styles.bottomPart}>
                        {site.description}
                      </div>
                      {userData?.user_id === user?.id && (
                        <DeleteBtn site={site} />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
