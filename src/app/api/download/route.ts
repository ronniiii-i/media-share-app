import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function GET(request: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("name") ?? "download";

  if (!fileUrl) return new Response("No URL provided", { status: 400 });

  const response = await fetch(fileUrl);
  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": blob.type,
    },
  });
}
