import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Clarift-Request", crypto.randomUUID());

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
    const token = secret ? await getToken({ req: request, secret }) : null;
    if (secret && !["Admin", "Editor", "Writer"].includes(String(token?.role ?? ""))) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
