
import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const host = req.headers.get("host");
  if (!host) {
    return NextResponse.json({ error: "Host not provided" }, { status: 400 });
  }
  const { client } = await connectToDatabase();
  const workspace = await client.db("users").collection("workspace").findOne({
    $or: [
      { "domain_info.domain": { $regex: host, $options: "i" } },
      { "domain_info.subdomain": { $regex: host, $options: "i" } },
    ],
    is_active: true,
  });
  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }
  return NextResponse.json(workspace);
};
