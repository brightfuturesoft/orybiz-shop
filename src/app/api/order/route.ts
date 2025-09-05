import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

export async function POST(req: NextRequest) {
  try {
    const order_data = await req.json();
    if (!order_data || Object.keys(order_data).length === 0) {
      return NextResponse.json({ error: "Order data is required" }, { status: 400 });
    }
    let user_id = order_data.user_id;
    let workspace_id = order_data.workspace_id;
    const workspace_name = order_data.workspace_name || "workspace"; 
    const cookie_header = req.headers.get("cookie");
    if (cookie_header && (!user_id || !workspace_id)) {
      const cookies = cookie_header.split("; ");
      const user_cookie = cookies.find((c) => c.endsWith(".user_info"));
      if (user_cookie) {
        const value = user_cookie.split("=")[1];
        try {
          const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          const user = JSON.parse(decrypted);
          user_id = user._id;
          workspace_id = user.workspace_id;
        } catch (err) {
          console.error("Failed to decrypt cookie", err);
        }
      }
    }

    const { client } = await connectToDatabase();
    const orders_collection = client.db("ecommerce").collection("orders");
    const last_order = await orders_collection
      .find({ workspace_id: workspace_id })
      .sort({ created_at: -1 })
      .limit(1)
      .toArray();
    let next_number = 1;
    if (last_order.length > 0) {
      const last_number_match = last_order[0].order_number.match(/-(\d+)$/);
      if (last_number_match) next_number = parseInt(last_number_match[1]) + 1;
    }
    const order_number = `${workspace_name}-${String(next_number).padStart(5, "0")}`;
    const result = await orders_collection.insertOne({
      ...order_data,
      order_number: order_number,
      order_type: "ecommerce",
      user_id: user_id,
      workspace_id: workspace_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json(
      { message: "Order created successfully", orderId: result.insertedId, order_number: order_number },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
