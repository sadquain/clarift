import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the clarift editorial workspace.",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-12">
        <section className="w-full rounded-3xl border border-line bg-paper p-6 shadow-sm" aria-labelledby="signin-title">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Secure workspace</p>
          <h1 id="signin-title" className="mt-2 text-3xl font-black tracking-tight">Sign in to clarift</h1>
          <form method="post" action="/api/auth/callback/credentials" className="mt-6 grid gap-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 min-h-12 w-full rounded-full border border-line bg-background px-4" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-full border border-line bg-background px-4" />
            </div>
            <button className="min-h-12 rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong">Continue</button>
          </form>
          <div className="mt-4 grid gap-2">
            <Link href={"/api/auth/signin/github" as never} className="rounded-full border border-line px-4 py-3 text-center text-sm font-semibold hover:border-brand">Continue with GitHub</Link>
            <Link href={"/api/auth/signin/google" as never} className="rounded-full border border-line px-4 py-3 text-center text-sm font-semibold hover:border-brand">Continue with Google</Link>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">
            Configure ADMIN_EMAIL, ADMIN_PASSWORD_HASH, OAuth credentials, and AUTH_SECRET for production access.
          </p>
        </section>
      </main>
    </>
  );
}
