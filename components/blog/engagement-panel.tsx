"use client";

import { useState } from "react";

export function EngagementPanel({ postSlug, initialLikes }: { postSlug: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarked, setBookmarked] = useState(false);

  async function react() {
    const response = await fetch("/api/engagement/reaction", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ postSlug }),
    });
    if (response.ok) setLikes((value) => value + 1);
  }

  async function bookmark() {
    const response = await fetch("/api/engagement/bookmark", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ postSlug }),
    });
    if (response.ok) setBookmarked((value) => !value);
  }

  return (
    <aside className="grid content-start gap-3" aria-label="Article engagement">
      <button onClick={react} className="rounded-full border border-line bg-paper px-4 py-3 text-sm font-semibold hover:border-brand">
        Like {likes.toLocaleString()}
      </button>
      <button
        onClick={bookmark}
        aria-pressed={bookmarked}
        className="rounded-full border border-line bg-paper px-4 py-3 text-sm font-semibold hover:border-brand"
      >
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=/blog/${postSlug}`}
        className="rounded-full border border-line bg-paper px-4 py-3 text-center text-sm font-semibold hover:border-brand"
      >
        Share
      </a>
    </aside>
  );
}
