import { Resend } from "resend";

export function renderWelcomeEmail(email: string) {
  return {
    subject: "Welcome to clarift",
    html: `<main><h1>Welcome to clarift</h1><p>You are subscribed as ${email}.</p><p>Manage preferences or unsubscribe from your account settings.</p></main>`,
    text: `Welcome to clarift. You are subscribed as ${email}.`,
  };
}

export async function sendWelcomeEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const message = renderWelcomeEmail(email);
  if (!apiKey) return { provider: "preview", message };
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "clarift <onboarding@resend.dev>",
    to: email,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
  return { provider: "resend", message };
}
