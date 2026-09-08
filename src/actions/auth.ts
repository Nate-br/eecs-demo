"use server";

import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth";

export async function loginAction(email: string) {
  // In a real app, you would verify the passwordHash here using bcrypt.
  // For the MVP, we just look up the user by email.
  let user;
  try {
    user = await db.user.findUnique({
      where: { email },
    });
  } catch (err: any) {
    console.error("Database Connection Error:", err);
    return { error: "Failed to connect to the database. Please ensure DATABASE_URL is configured in Render." };
  }

  if (!user) {
    return { error: "Invalid credentials. Please check your email." };
  }

  await createSession(user.id, user.role, user.enterpriseId, user.name, user.enterpriseName);
  return { success: true, role: user.role };
}

export async function logoutAction() {
  await deleteSession();
  return { success: true };
}
