import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspace_id"); 
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!workspace_id) {
    return NextResponse.json({ error: "Workspace ID not provided" }, { status: 400 });
  }
  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};
    if (workspace_id) filter.workspace_id = workspace_id;
    if (user_id) filter.user_id = user_id;

    const addresses = await db.collection("addres_book").find(filter).toArray();
    return NextResponse.json({ address: addresses }, { status: 200 });
  }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch address" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const addressId = url.searchParams.get("address_id");
    if (!addressId) return NextResponse.json({ error: "Address ID not provided" }, { status: 400 });

    let objectId;
    try {
      objectId = new ObjectId(addressId);
    } catch {
      return NextResponse.json({ error: "Invalid address ID" }, { status: 400 });
    }

    const body = await req.json();
    if (!body || Object.keys(body).length === 0)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");

    const result = await db.collection("addres_book").findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnDocument: "after" }
    );

    if (!result?.value) return NextResponse.json({ error: "Address update failed" }, { status: 404 });

    return NextResponse.json({ address: result.value });
  } catch (err) {
    console.error("Error in PATCH /api/address:", err);
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 });
  }
}
