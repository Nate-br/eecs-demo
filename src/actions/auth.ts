"use server";

import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth";

export async function loginAction(email: string) {
  // In a real app, you would verify the passwordHash here using bcrypt.
  // For the MVP, we just look up the user by email.
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid credentials. Please check your email." };
  }

  await createSession(user.id, user.role, user.enterpriseId);
  return { success: true, role: user.role };
}

export async function logoutAction() {
  await deleteSession();
  return { success: true };
}
