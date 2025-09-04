import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

export async function POST(req: NextRequest) {
  try {
    const cartData = await req.json();
    if (!cartData?.length) {
      return NextResponse.json({ error: "Cart items required" }, { status: 400 });
    }

    let user_id: string | null = null;
    let workspace_id: string | null = null;
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = cookieHeader.split("; ").map(c => c.trim());
    const userCookie = cookies.find(c => c.endsWith(".user_info") || c.includes(".user_info="));
    if (userCookie) {
      const value = decodeURIComponent(userCookie.split("=")[1] || "");
      try {
        const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          const user = JSON.parse(decrypted);
          user_id = user._id || null;
          workspace_id=user.workspace_id;
          console.log("User from cookie:", user);
        }
      } catch (err) {
        console.error("Failed to decrypt user cookie:", err);
      }
    } else {
      console.warn("No user_info cookie found");
    }
    const { client } = await connectToDatabase();
    const result = await client
      .db("ecommerce")
      .collection("cartOrders")
      .insertOne({
        user_id: user_id,
        workspace_id: workspace_id,
        ...cartData
        
      });
    return NextResponse.json(
      { message: "Cart saved successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /cart:", err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
