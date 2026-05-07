export function TableOfContents({ headings }: { headings: string[] }) {
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-line bg-paper p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">On this page</h2>
      <ol className="mt-3 grid gap-2 text-sm">
        {headings.map((heading) => {
          const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          return (
            <li key={heading}>
              <a href={`#${id}`} className="text-muted transition hover:text-brand">
                {heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
