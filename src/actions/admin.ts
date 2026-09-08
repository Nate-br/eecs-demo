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

  if (!titleEn || !description || !target) {
    return { error: "Missing required fields" };
  }

  // Generate a random ID for the mock DB
  const id = Math.floor(Math.random() * 1000) + 10;
  
  const newModule = {
    id,
    titleEn,
    titleAm: titleAm || titleEn,
    description,
    target
  };

  // In a real app we'd use db.module.create, but our mock DB doesn't have create.
  // We'll just read, push, and write back (since we have access to the fs locally).
  import('fs/promises').then(async (fs) => {
    const DB_FILE = process.cwd() + '/data.json';
    try {
      const data = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
      data.modules.push(newModule);
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    } catch(e) {}
  });

  revalidatePath('/[lang]/admin/dashboard');
  revalidatePath('/[lang]/employee/dashboard');

  return { success: true };
}
