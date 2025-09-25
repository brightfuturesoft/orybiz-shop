import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspaceId");
  if (!workspace_id) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }
  const { client } = await connectToDatabase();
  const categories = await client
    .db("items")
    .collection("category")
    .find({ workspace_id: workspace_id, delete:false})
    .toArray();

  return NextResponse.json({ categories });
}
