/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/get-categories.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/mongo";

interface Category {
  _id: string;
  name: string;
  parentId?: string;
  level: number;
}


interface ResponseData {
  data: Category[];
  error?: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId || typeof workspaceId !== "string") {
      return res.status(400).json({ data: [], error: "workspaceId is required" });
    }
    const { db } = await connectToDatabase();
    const categoriesFromDb = await db
      .collection("category_collection")
      .find({ workspace_id: workspaceId, delete: { $ne: true } })
      .toArray();

    // Map to proper Category type
    const categories: Category[] = categoriesFromDb.map((cat: any) => ({
      _id: cat._id.toString(),
      name: cat.name || "Unnamed",
      parentId: cat.parentId,
      level: cat.level,
    }));

    return res.status(200).json({ data: categories });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ data: [], error: "Internal Server Error" });
  }
}
