export function NewsletterForm() {
  return (
    <form action="/api/newsletter" method="post" className="glass grid gap-3 rounded-3xl p-4 sm:grid-cols-[1fr_auto]">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-h-12 rounded-full border border-line bg-paper px-4 text-base text-ink placeholder:text-muted"
      />
      <button
        type="submit"
        className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-brand"
      >
        Join newsletter
      </button>
      <p className="sm:col-span-2 text-sm text-muted" role="status" aria-live="polite">
        Weekly AI publishing tactics, no noise.
      </p>
    </form>
  );
}
