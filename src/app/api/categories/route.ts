import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const workspaceId = req.nextUrl.searchParams.get("workspaceId");
  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }
  const { client } = await connectToDatabase();
  const categories = await client
    .db("items")
    .collection("category")
    .find({ workspace_id: workspaceId})
    .toArray();

  return NextResponse.json({ categories });
}
