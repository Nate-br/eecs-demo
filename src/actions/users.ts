"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createUserAction(formData: FormData) {
  const auth = await getSession();
  
  // STRICT RBAC: Only Admins can create users
  if (!auth || auth.role !== "Admin") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !role) {
    throw new Error("Missing fields");
  }

  // Ensure email is unique
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already exists" };
  }

  await db.user.create({
    data: {
      name,
      email,
      role,
      passwordHash: "dummy_hash_for_mvp",
      enterpriseId: auth.enterpriseId,
      enterpriseName: "Awash Bank" // Hardcoded for MVP single-tenant demo
    }
  });

  revalidatePath("/[lang]/admin/users", "page");
  return { success: true };
}
