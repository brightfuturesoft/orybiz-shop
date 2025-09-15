import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const reviewText = formData.get("reviewText") as string;
    const rating = parseInt(formData.get("rating") as string, 10);
    const images = formData.getAll("images") as File[];

    const uploadDir = path.join(process.cwd(), "public/uploads/reviews");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const imagePaths: string[] = [];
    for (const file of images) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);
      imagePaths.push(`/uploads/reviews/${filename}`);
    }

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const result = await db.collection("reviews").insertOne({
      reviewText,
      rating,
      images: imagePaths,
      created_at: new Date(),
    });

    return NextResponse.json(
      { message: "Review saved successfully", reviewId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const reviews = await db.collection("reviews").find({}).toArray();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
