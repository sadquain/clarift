const baseUrl = process.env.CLARIFT_URL || "http://127.0.0.1:3000";

async function tick() {
  const response = await fetch(`${baseUrl}/api/ai/jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      mode: "Readability",
      prompt: "Evaluate readability for scheduled content and report improvement recommendations.",
      priority: "low",
    }),
  });
  console.log("queued", response.status);
}

setInterval(() => {
  tick().catch((error) => console.error(error));
}, Number(process.env.AI_WORKER_INTERVAL_MS || 30000));

tick().catch((error) => console.error(error));
