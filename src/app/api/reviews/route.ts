import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("user_id") as string; // user id added
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
      user_id: userId,
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
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const userId = req.nextUrl.searchParams.get("user_id");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};
    if (userId) filter.user_id = userId;
    const reviews = await db.collection("reviews").find(filter).toArray();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const reviewId = req.nextUrl.searchParams.get("id");
    if (!reviewId) return NextResponse.json({ error: "Review id required" }, { status: 400 });

    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");

    const review = await db.collection("reviews").findOne({ _id: new ObjectId(reviewId) });
    if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    if (review.images && Array.isArray(review.images)) {
      for (const imgPath of review.images) {
        const fullPath = path.join(process.cwd(), "public", imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      }
    }

    await db.collection("reviews").deleteOne({ _id: new ObjectId(reviewId) });
    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
