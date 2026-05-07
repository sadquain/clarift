"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export function CommentsPanel({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`/api/comments?postSlug=${postSlug}`)
      .then((response) => response.json())
      .then((data: { comments: Comment[] }) => setComments(data.comments));
  }, [postSlug]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        postSlug,
        authorName: form.get("authorName"),
        body: form.get("body"),
      }),
    });
    setStatus(response.ok ? "Comment submitted for moderation." : "Comment could not be submitted.");
    event.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6" aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-2xl font-bold">Discussion</h2>
      <div className="mt-5 grid gap-3">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-line bg-paper p-4">
              <h3 className="font-semibold">{comment.authorName}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{comment.body}</p>
            </article>
          ))
        ) : (
          <p className="rounded-2xl border border-line bg-paper p-4 text-sm text-muted">No approved comments yet.</p>
        )}
      </div>
      <form onSubmit={submit} className="mt-6 grid gap-4 rounded-3xl border border-line bg-paper p-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Name</span>
          <input name="authorName" required minLength={2} className="min-h-12 rounded-full border border-line bg-background px-4" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Comment</span>
          <textarea name="body" required minLength={2} className="min-h-28 rounded-2xl border border-line bg-background p-4" />
        </label>
        <button className="min-h-12 rounded-full bg-brand px-5 text-sm font-semibold text-white">Submit for moderation</button>
        <p role="status" aria-live="polite" className="text-sm text-muted">{status}</p>
      </form>
    </section>
  );
}
