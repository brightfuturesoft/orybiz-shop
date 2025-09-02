import { Db, MongoClient } from "mongodb";
const MONGODB_URI = "mongodb+srv://bright_erp:bright_erp@brighterp.a62n9gp.mongodb.net"; 

if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable");

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
 const db = client.db('users');
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}
