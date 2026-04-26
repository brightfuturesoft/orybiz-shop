import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db("users");
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
