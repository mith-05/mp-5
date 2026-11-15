
import { getDatabase } from "@/lib/mongodb";
import { redirect, notFound } from "next/navigation";

type RedirectProps = {
    params: Promise<{ alias: string }>;
};

export default async function RedirectPage({ params }: RedirectProps) {

    const { alias } = await params;

    const db = await getDatabase();

    // Search for the document with the matching alias.
    const result = await db.collection("urls").findOne({ alias: alias });

    // displaying a 404 error page if the alias does not exist.
    if (!result) {
        notFound();
    }

    // Automatically redirect the user to the original URL.
    redirect(result.url);
}
