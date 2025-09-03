import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json(); 
    if (!orderData || Object.keys(orderData).length === 0) {
      return NextResponse.json(
        { error: "Order data is required" },
        { status: 400 }
      );
    }

    const { client } = await connectToDatabase();
    const result = await client
      .db("orders")
      .collection("order") 
      .insertOne({
        ...orderData,
        createdAt: new Date(),
      });
    return NextResponse.json(
      { message: "Order created successfully", orderId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
