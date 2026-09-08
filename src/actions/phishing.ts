"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function launchCampaignAction(formData: FormData) {
  const auth = await getSession();
  if (!auth || auth.role !== "Admin") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const targetDepartment = formData.get("targetDepartment") as string;
  const template = formData.get("template") as string;

  if (!name || !targetDepartment || !template) {
    throw new Error("Missing required fields");
  }

  // Generate a mock campaign
  const campaign = await db.campaign.create({
    data: {
      name,
      targetDepartment,
      template,
      enterpriseId: auth.enterpriseId,
      status: "ACTIVE",
      sent: 0,
    }
  });

  // Mock sending emails to users in that department (or all users for MVP)
  // We'll generate tracking URLs that include the campaignId and userId
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  // To simulate sending, we'll just log the generated phishing links to the console
  // In a real app, this would use AWS SES or SendGrid.
  console.log(`\n\n=== CAMPAIGN LAUNCHED: ${campaign.name} ===`);
  console.log(`Target: ${targetDepartment}`);
  console.log(`Template: ${template}`);
  console.log(`-------------------------------------------`);
  console.log(`Mocking Email Dispatch...`);
  console.log(`To simulate an employee clicking the link, visit this URL:`);
  console.log(`${baseUrl}/en/phishing/login?c=${campaign.id}&u=33333333-3333-3333-3333-333333333332`);
  console.log(`(This tracks the employee account clicking the link)`);
  console.log(`===========================================\n\n`);

  revalidatePath("/[lang]/admin/campaigns", "page");
  
  return { success: true, campaignId: campaign.id };
}
