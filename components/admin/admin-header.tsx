import Link from "next/link";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/admin/ai", label: "AI" },
  { href: "/admin/search", label: "Search" },
  { href: "/admin/analytics", label: "Analytics" },
] as const;

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-ink text-sm text-paper">cl</span>
          <span className="text-lg tracking-tight">clarift admin</span>
        </Link>
        <nav aria-label="Admin navigation" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-paper hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
          <Link href="/" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong">
            View site
          </Link>
        </div>
      </div>
    </header>
  );
}
