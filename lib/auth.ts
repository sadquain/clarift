import type { Role } from "@/lib/content";

const rolePermissions: Record<Role, string[]> = {
  Admin: ["manage:users", "manage:settings", "publish:post", "write:post", "read:analytics"],
  Editor: ["publish:post", "write:post", "read:analytics"],
  Writer: ["write:post"],
  Reader: ["bookmark:post", "comment:post"],
};

export function can(role: Role, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export const authArchitecture = {
  provider: "Auth.js / NextAuth",
  adapter: "PrismaAdapter",
  session: "database",
  protectedRoutes: ["/admin", "/api/ai", "/api/uploadthing"],
  oauthProviders: ["Google", "GitHub"],
  passwordFlow: "bcryptjs hashed credentials with verified email handoff",
};
