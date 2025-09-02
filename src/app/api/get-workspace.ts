
import { getWorkspace } from "@/app/lib/workspace";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const domain = req.headers.host;
  const workspace = await getWorkspace(domain);
  res.status(200).json({ data: workspace });
}
