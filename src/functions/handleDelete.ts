"use server";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
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
const handleDelete = async ({ site }: DeleteBtnProps) => {
  await prisma.site.delete({
    where: {
      id: site.id,
    },
  });
  revalidatePath(`/users/${site.userId}`);
};

export default handleDelete;
