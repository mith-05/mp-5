
import { MongoClient } from "mongodb";

// Read the MongoDB connection string from .env.local.
const uri = process.env.MONGODB_URI;

// Check that the connection string exists.
if (!uri) {
    throw new Error("MONGODB_URI is not defined.");
}

const client = new MongoClient(uri);

export async function getDatabase() {
    await client.connect();

    // Use the database named "urlShortener".
    return client.db("urlShortener");
}
