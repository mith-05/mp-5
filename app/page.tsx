
"use client";
import { useState } from "react";
import UrlShortener from "@/lib/UrlShortener";

export default function Home() {

    // Store the original URL entered by the user.
    const [url, setUrl] = useState("");

    // Store the custom alias entered by the user.
    const [alias, setAlias] = useState("");

    // "" message returned by the server
    const [message, setMessage] = useState("");

    // "" shortened url
    const [shortUrl, setShortUrl] = useState("");

    // this function runs when the form is submitted by the user.
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // prevents browser from refreshing the page when we hit the submit button
        // Clear the previous message and shortened URL.
        setMessage("");
        setShortUrl("");

        // Call our server action to save the URL and alias.
        const result = await UrlShortener(url, alias);

        // Display the message returned by the server action.
        setMessage(result.message);

        // If successful, construct the shortened URL.
        if (result.success) {
            setShortUrl(window.location.origin + "/r/" + encodeURIComponent(alias));
        }
    }

    return (
        <main>
            {/* Main heading of our application. */}
            <h1>URL Shortener</h1>

            {/* Brief description of the website. */}
            <p>
                Enter a URL and create a shorter link using a custom alias.
            </p>

            {/* Call handleSubmit when the form is submitted. */}
            <form onSubmit={handleSubmit}>

                <label htmlFor="url">Original URL:</label>

                <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} required/>

                <label htmlFor="alias">Custom Alias:</label>

                <input id="alias" value={alias} onChange={(e) => setAlias(e.target.value)} required/>

                {/* Button that submits the form. */}
                <button type="submit">Shorten URL</button>
            </form>

            {message && <p>{message}</p>}

            {shortUrl && (
                <div>
                    <p>Your shortened URL:</p>

                    <a href={shortUrl} target="_blank">{shortUrl}</a>
                </div>
            )}
        </main>
    );
}
