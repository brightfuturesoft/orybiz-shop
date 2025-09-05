import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspaceId");
  if (!workspace_id) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }
  const { client } = await connectToDatabase();
  const products = await client
    .db("items")
    .collection("item")
    .find({ workspace_id: workspace_id})
    .toArray();

  return NextResponse.json({ products });
}
