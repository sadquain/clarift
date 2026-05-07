import { validateNewsletter } from "@/lib/validators";
import { sendWelcomeEmail } from "@/lib/services/newsletter";

export async function POST(request: Request) {
  const form = await request.formData();
  const validation = validateNewsletter(form);
  if (!validation.ok) {
    return Response.json({ errors: validation.errors }, { status: 400 });
  }

  const email = await sendWelcomeEmail(validation.data.email);
  return Response.json({
    ok: true,
    email: validation.data.email,
    provider: email.provider,
  });
}
