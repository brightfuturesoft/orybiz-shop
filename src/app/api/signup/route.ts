import { connectToDatabase } from "@/app/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 


export async function POST(req: NextRequest) {
  try {
    const { full_name, email, password, workspace_id } = await req.json();

    // Required field validation
    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const existing_user = await db.collection("users").findOne({ email });
    if (existing_user) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }


    const hashed_password = await bcrypt.hash(password, 12);
    const result = await db.collection("users").insertOne({
      full_name,
      email,
      password: hashed_password,
      phone_number: "",
      user_type: "ecommerce",
      profile_picture: "",
      workspace_id: workspace_id || null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
