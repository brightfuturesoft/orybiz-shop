import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();
    if (!orderData || Object.keys(orderData).length === 0) {
      return NextResponse.json({ error: "Order data is required" }, { status: 400 });
    }

    // ✅ Get user from cookies if not provided
    let userId = orderData.user_id;
    let workspaceId = orderData.workspace_id;
    const workspaceName = orderData.workspace_name || "workspace"; // frontend must send workspace_name
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader && (!userId || !workspaceId)) {
      const cookies = cookieHeader.split("; ");
      const userCookie = cookies.find((c) => c.endsWith(".user_info"));
      if (userCookie) {
        const value = userCookie.split("=")[1];
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

    const { client } = await connectToDatabase();
    const ordersCollection = client.db("ecommerce").collection("orders");

    // ✅ Generate order_number
    const lastOrder = await ordersCollection
      .find({ workspace_id: workspaceId })
      .sort({ created_at: -1 })
      .limit(1)
      .toArray();

    let nextNumber = 1;
    if (lastOrder.length > 0) {
      const lastNumberMatch = lastOrder[0].order_number.match(/-(\d+)$/);
      if (lastNumberMatch) nextNumber = parseInt(lastNumberMatch[1]) + 1;
    }

    const orderNumber = `${workspaceName}-${String(nextNumber).padStart(5, "0")}`;

    const result = await ordersCollection.insertOne({
      ...orderData,
      order_number: orderNumber,
      order_type: "ecommerce",
      user_id: userId,
      workspace_id: workspaceId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json(
      { message: "Order created successfully", orderId: result.insertedId, order_number: orderNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
