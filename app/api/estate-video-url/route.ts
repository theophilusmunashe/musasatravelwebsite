import { NextResponse } from "next/server";
import { JUMPSHARE_VIEWER_ID } from "@/lib/estate-tokens";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(`https://jumpshare.com/embed/${JUMPSHARE_VIEWER_ID}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Could not load video embed" }, { status: 502 });
    }

    const html = await res.text();
    const match = html.match(/src="(https:\/\/cdn\.jumpshare\.com\/preview\/[^"]+\.mp4)"/);

    if (!match?.[1]) {
      return NextResponse.json({ error: "Video URL not found" }, { status: 404 });
    }

    return NextResponse.json({ url: match[1] });
  } catch {
    return NextResponse.json({ error: "Could not resolve video URL" }, { status: 500 });
  }
}
