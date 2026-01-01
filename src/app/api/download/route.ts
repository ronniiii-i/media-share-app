import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("name") || "download";

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
