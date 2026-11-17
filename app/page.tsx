
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

        // saves the URL and alias.
        const result = await UrlShortener(url, alias);

        // Display the message returned by the server action.
        setMessage(result.message);

        // If successful, construct the shortened URL
        // window .location.origin is the original url then we add the route to redirect users followed by the alias that is converted into a url safe format.
        if (result.success) {
            setShortUrl(window.location.origin + "/r/" + encodeURIComponent(alias));
        }
    }

    return (
        <main>
            <h1>URL Shortener</h1>
            <p>
                Enter a URL and create a shorter link using a custom alias.
            </p>
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
