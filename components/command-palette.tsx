"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useRef, useState } from "react";

const commands: { label: string; href: Route }[] = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Admin", href: "/admin" },
  { label: "Featured post", href: "/blog/ai-editorial-operating-system" as Route },
  { label: "AI strategy", href: "/categories/ai-strategy" as Route },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden rounded-full border border-line bg-paper px-3 py-2 text-sm font-semibold text-muted hover:text-ink sm:inline-flex"
      >
        Command
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-start bg-ink/45 px-4 py-20" role="presentation" onMouseDown={() => setOpen(false)}>
          <dialog
            open
            aria-modal="true"
            aria-labelledby="command-title"
            className="mx-auto w-full max-w-lg rounded-3xl border border-line bg-paper p-4 text-ink shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 id="command-title" className="text-lg font-bold">Command palette</h2>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="rounded-full border border-line px-3 py-1 text-sm font-semibold">
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              {commands.map((command) => (
                <Link key={command.href} href={command.href} onClick={() => setOpen(false)} className="rounded-2xl bg-background px-4 py-3 font-medium hover:text-brand">
                  {command.label}
                </Link>
              ))}
            </div>
          </dialog>
        </div>
      ) : null}
    </>
  );
}
