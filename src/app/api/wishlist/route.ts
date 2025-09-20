import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!user_id) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");

    const wishlist = await db
      .collection("wishlist")
      .find({ user_id, delete: false })
      .toArray();

    return NextResponse.json({ wishlist }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product_id,
      user_id,
      product_name,
      product_image,
      sku,
      variation,
      quantity,
      order_price,
    } = body;

    if (!user_id) {
      return NextResponse.json({ error: "user_id required" }, { status: 400 });
    }

    if (!product_id || !product_name) {
      return NextResponse.json(
        { error: "product_id and product_name required" },
        { status: 400 }
      );
    }
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    const wishlistItem = {
      product_id,
      user_id,
      product_name,
      product_image: product_image || "/placeholder.png",
      sku: sku || "",
      variation: variation || { color: "", size: "" },
      quantity: quantity || 1,
      order_price: order_price || 0,
      delete: false,
      createdAt: new Date(),
    };

    await db.collection("wishlist").insertOne(wishlistItem);

    return NextResponse.json(
      { message: "Item added to wishlist", wishlistItem },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id and user_id required" },
      { status: 400 }
    );
  }

  try {
    const { client } = await connectToDatabase();
    const db = client.db("ecommerce");
    await db
      .collection("wishlist")
      .updateOne({ _id: new ObjectId(id) }, { $set: { delete: true } });

    return NextResponse.json(
      { message: "Wishlist item deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete wishlist item" },
      { status: 500 }
    );
  }
}
