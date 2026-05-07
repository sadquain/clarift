export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };

export function validateNewsletter(input: FormData | Record<string, unknown>): ValidationResult<{ email: string }> {
  const email =
    input instanceof FormData ? String(input.get("email") ?? "") : String(input.email ?? "");
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, errors: { email: "Enter a valid email address." } };
  }
  return { ok: true, data: { email: normalized } };
}

export function validateAiPrompt(input: unknown): ValidationResult<{ prompt: string; mode: string }> {
  const record = typeof input === "object" && input ? (input as Record<string, unknown>) : {};
  const prompt = String(record.prompt ?? "").trim();
  const mode = String(record.mode ?? "draft").trim();
  if (prompt.length < 12) {
    return { ok: false, errors: { prompt: "Prompt must be at least 12 characters." } };
  }
  if (prompt.length > 4000) {
    return { ok: false, errors: { prompt: "Prompt must stay under 4,000 characters." } };
  }
  return { ok: true, data: { prompt, mode } };
}
