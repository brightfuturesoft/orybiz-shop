import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import CryptoJS from "crypto-js";
import { ObjectId } from "mongodb";

const SECRET_KEY = "bright-erp-secret";

// Helper function to get user ID from cookie
export async function getUserIdFromCookie(req: NextRequest): Promise<string | null> {
  const cookie_header = req.headers.get("cookie") || "";
  const cookies = cookie_header.split(";").map(c => c.trim());
  const user_cookie = cookies.find(c => c.includes(".user_info="));
  if (!user_cookie) return null;

  const value = decodeURIComponent(user_cookie.split("=")[1] || "");
  try {
    const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) return null;
    const user = JSON.parse(decrypted);
    return user._id || null;
  } catch (err) {
    console.error("Failed to decrypt cookie:", err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user_id = await getUserIdFromCookie(req);
    if (!user_id) return NextResponse.json({ error: "User not found in cookie" }, { status: 401 });

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const userFromDB = await db.collection("users").findOne({ _id: new ObjectId(user_id) });
    if (!userFromDB) return NextResponse.json({ error: "User not found in database" }, { status: 404 });

    return NextResponse.json({ user: userFromDB });
  } catch (err) {
    console.error("Error in GET /api/user:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user_id = await getUserIdFromCookie(req);
    if (!user_id) return NextResponse.json({ error: "User not found in cookie" }, { status: 401 });

    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");

    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: body },
      { returnDocument: "after" }
    );

    if (!result?.value) return NextResponse.json({ error: "User update failed" }, { status: 404 });

    return NextResponse.json({ user: result.value });  // <--- Must return updated user
  } catch (err) {
    console.error("Error in PATCH /api/user:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
