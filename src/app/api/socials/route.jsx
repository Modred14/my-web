import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const headers = {
      "User-Agent": "modred-socials",
      Accept: "application/vnd.github+json",
    };

  
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch("https://api.github.com/users/Modred14", {
      headers,
      next: { revalidate: 600 }, // cache 10 minutes on server
    });

    if (!res.ok) return NextResponse.json({}, { status: 200 });

    const data = await res.json();

    return NextResponse.json(
      { github: Number(data.followers) || 0 },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}