import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://clarift.ai"),
  title: {
    default: "clarift - AI-powered editorial intelligence",
    template: "%s | clarift",
  },
  description:
    "An enterprise AI blogging platform for teams that publish faster, rank smarter, and keep editorial quality high.",
  openGraph: {
    title: "clarift",
    description: "AI-powered blogging, CMS workflows, analytics, and SEO intelligence.",
    siteName: "clarift",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@clarift",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
