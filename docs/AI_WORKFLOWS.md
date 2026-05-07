# AI Workflows

The AI assistant supports:

- Full article drafts
- Title generation
- SEO metadata
- FAQs
- Tag and category recommendations
- Rewrites
- Summaries
- Expansion
- Readability scoring

Prompt versions live in `lib/services/ai.ts` and should be mirrored into the `PromptVersion` table for auditability. Every provider call should write an `AiGeneration` row with user, mode, model, prompt hash, token count, latency, and prompt version.

Provider order:

1. Groq when `GROQ_API_KEY` is present.
2. OpenAI when `OPENAI_API_KEY` is present.
3. Local preview output for development.
