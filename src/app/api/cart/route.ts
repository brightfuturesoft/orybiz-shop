import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

export async function POST(req: NextRequest) {
  try {
    const cartData = await req.json();
    if (!cartData || !cartData.items?.length) {
      return NextResponse.json({ error: "Cart items required" }, { status: 400 });
    }
    let userId: string | null = null;
    let workspaceId: string | null = null;
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split("; ");
      const userCookie = cookies.find((c) => c.endsWith(".user_info"));
      if (userCookie) {
        const value = decodeURIComponent(userCookie.split("=")[1]);
        try {
          const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          const user = JSON.parse(decrypted);
          userId = user._id;
          workspaceId = user.workspace_id;
        } catch (err) {
          console.error("Failed to decrypt cookie", err);
        }
      }
    }

    if (!userId || !workspaceId) {
      return NextResponse.json({ error: "User not logged in" }, { status: 401 });
    }
    const { client } = await connectToDatabase();
    const result = await client.db("ecommerce").collection("cartOrders").insertOne({
      user_id: userId,
      workspace_id: workspaceId,
      items: cartData.items,
      total_amount: cartData.total,
      created_at: new Date(),
    });
    return NextResponse.json({ message: "Cart saved successfully", id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
