import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// A 1x1 transparent GIF tracking pixel
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const campaignId = params.id;
  const userId = request.nextUrl.searchParams.get("u");

  if (campaignId && userId) {
    // Log the "OPENED" event
    await db.phishingEvent.create({
      data: {
        campaignId,
        userId,
        type: "OPENED",
        userAgent: request.headers.get("user-agent") || "unknown",
        ip: request.headers.get("x-forwarded-for") || "unknown",
      }
    });
  }

  // Always return the transparent GIF
  return new NextResponse(TRANSPARENT_GIF, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
