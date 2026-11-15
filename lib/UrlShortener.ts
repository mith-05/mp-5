"use server";

// Import the function that connects to MongoDB.
import { getDatabase } from "@/lib/mongodb";

// This function saves a URL and its custom alias to MongoDB.
export default async function UrlShortener(url: string, alias: string) {

    // check whether the entered URL is valid.
    try {
        const parsedUrl = new URL(url);

        // only allow HTTP and HTTPS URLs.
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return {success: false, message: "Please enter a valid URL."};
        }
    } catch {
        return {
            success: false,
            message: "Please enter a valid URL."
        };
    }

    const db = await getDatabase();
    const collection = db.collection("urls");
    // searching the database for an existing document with the same alias that was enterd.
    const existingAlias = await collection.findOne({ alias: alias });

    // Return an error if the alias is already being used.
    if (existingAlias) {
        return {
            success: false,
            message: "This alias is already taken."
        };
    }

    // Save the URL and alias to MongoDB.
    await collection.insertOne({url: url, alias: alias});

    // Return a success message.
    return {success: true, message: "Short URL created successfully!"};
}
