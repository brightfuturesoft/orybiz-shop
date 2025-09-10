import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspace_id"); 
  if (!workspace_id) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }
  try {
    const { client } = await connectToDatabase();
    const banners = await client
      .db("ecommerce")
      .collection("banner")
      .find({ workspace_id })
      .toArray();
    return NextResponse.json(banners, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}
