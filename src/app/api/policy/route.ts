import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspaceId");
  if (!workspace_id) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }

  try {
    const { client } = await connectToDatabase();
    const policies = await client
      .db("ecommerce")
      .collection("policy")
      .find({
        workspace_id: workspace_id,
        status: "Active"
      })
      .toArray();

    return NextResponse.json({ policies }, { status: 200 });
  } catch (err) {
    console.error("Error fetching policies:", err);
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
  }
}
