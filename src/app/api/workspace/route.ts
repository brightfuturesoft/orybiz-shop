import { connectToDatabase } from "@/app/lib/mongo"
import { type NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
  try {
      const { client } = await connectToDatabase();
    const host = request.headers.get("host") || request.nextUrl.searchParams.get("domain")
    if (!host) {
      return NextResponse.json({ error: "Domain not provided" }, { status: 400 })
    }
    const workspace = await  client.db('users').collection("workspace").findOne({
      $or: [
        { "domain_info.domain": { $regex: host, $options: "i" } },
        { "domain_info.subdomain": { $regex: host, $options: "i" } },
      ],
      is_active: true,
    })

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 })
    }

    return NextResponse.json(workspace)
  } catch (error) {
    console.error("Error fetching workspace:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}