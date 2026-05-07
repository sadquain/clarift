const target = process.env.CLARIFT_URL || "http://127.0.0.1:3000";
const concurrency = Number(process.env.LOAD_CONCURRENCY || 10);
const requests = Number(process.env.LOAD_REQUESTS || 100);

let ok = 0;
let failed = 0;
const started = Date.now();

async function hit(i) {
  const path = i % 3 === 0 ? "/" : i % 3 === 1 ? "/search" : "/blog/ai-editorial-operating-system";
  const response = await fetch(`${target}${path}`);
  if (response.ok) ok += 1;
  else failed += 1;
}

for (let i = 0; i < requests; i += concurrency) {
  await Promise.all(Array.from({ length: Math.min(concurrency, requests - i) }, (_, offset) => hit(i + offset)));
}

console.log(JSON.stringify({ target, requests, ok, failed, durationMs: Date.now() - started }, null, 2));
