"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createModuleAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return { error: "Unauthorized" };
  }

  const titleEn = formData.get("titleEn") as string;
  const titleAm = formData.get("titleAm") as string;
  const description = formData.get("description") as string;
  const target = formData.get("target") as string;
  const videoUrl = formData.get("videoUrl") as string | null;

  if (!titleEn || !description || !target) {
    return { error: "Missing required fields" };
  }

  await db.module.create({
    data: {
      titleEn,
      titleAm: titleAm || titleEn,
      description,
      target,
      videoUrl
    }
  });

  revalidatePath('/[lang]/admin/dashboard');
  revalidatePath('/[lang]/admin/settings');
  revalidatePath('/[lang]/employee/dashboard');

  return { success: true };
}
