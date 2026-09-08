"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { transporter, getPhishingTemplate } from "@/lib/email";

export async function launchCampaignAction(formData: FormData) {
  const auth = await getSession();
  if (!auth || auth.role !== "Admin") {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const targetDepartment = formData.get("targetDepartment") as string;
  const template = formData.get("template") as string;

  if (!name || !targetDepartment || !template) {
    return { error: "Missing required fields" };
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

  // Fetch target users
  let targetUsers = [];
  if (targetDepartment === "All") {
    targetUsers = await db.user.findMany({
      where: { role: "Employee" } // Don't phish admins by default
    });
  } else {
    // For MVP, we don't have department field on users yet, so just fetch all if they select a specific one
    targetUsers = await db.user.findMany({
      where: { role: "Employee" }
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let sentCount = 0;

  // Send emails
  for (const user of targetUsers) {
    const trackingUrl = `${baseUrl}/en/phishing/login?c=${campaign.id}&u=${user.id}`;
    const emailContent = getPhishingTemplate(template, trackingUrl);

    try {
      await transporter.sendMail({
        from: `"IT Security" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      sentCount++;
    } catch (error) {
      console.error(`Failed to send phishing email to ${user.email}:`, error);
    }
  }

  // Update campaign with sent count
  await db.campaign.update({
    where: { id: campaign.id },
    data: { sent: sentCount }
  });

  revalidatePath("/[lang]/admin/campaigns", "page");
  
  return { success: true, campaignId: campaign.id };
}
