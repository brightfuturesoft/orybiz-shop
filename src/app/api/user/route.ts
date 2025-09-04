import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import CryptoJS from "crypto-js";
import { ObjectId } from "mongodb";

const SECRET_KEY = "bright-erp-secret";

export async function GET(req: NextRequest) {
  try {
    let user_id: string | null = null;
    const cookie_header = req.headers.get("cookie") || "";
    const cookies = cookie_header.split("; ").map(c => c.trim());
    const user_cookie = cookies.find(c => c.endsWith(".user_info") || c.includes(".user_info="));
    if (user_cookie) {
      const value = decodeURIComponent(user_cookie.split("=")[1] || "");
      try {
        const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          const user = JSON.parse(decrypted);
          user_id = user._id || null;
        }
      } catch (err) {
        console.error("Failed to decrypt cookie:", err);
        return NextResponse.json({ error: "Invalid user cookie" }, { status: 400 });
      }
    }
    if (!user_id) {
      return NextResponse.json({ error: "User not found in cookie" }, { status: 401 });
    }
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const userFromDB = await db.collection("users").findOne({ _id: new ObjectId(user_id) });
    if (!userFromDB) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }
    return NextResponse.json({ user: userFromDB });
  } catch (err) {
    console.error("Error in /api/user:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
