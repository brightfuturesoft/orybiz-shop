import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email as string;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");

    // Check if email already subscribed
    const existing = await db.collection("newsletter").findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
    }
    const result = await db.collection("newsletter").insertOne({
      email,
      created_at: new Date(),
      status: "active",
    });
    return NextResponse.json(
      { message: "Subscribed successfully", subscriptionId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const subscriptions = await db.collection("newsletter").find({}).toArray();
    return NextResponse.json({ subscriptions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}
