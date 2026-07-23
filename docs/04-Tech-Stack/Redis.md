---
tags: [tech]
---

# Redis

Enters at Phase 3, when LLM calls start costing money.

## Uses

**Candle cache.** Chart replay hits the same windows repeatedly. Key `candles:{instrument_id}:{tf}:{from}:{to}`. Historical candles are immutable — long TTL. Recent bars — short TTL.

**Rate limiters.** Token buckets for provider limits (Binance request weight) and per-user LLM spend caps. The one you will regret not having.

**Idempotency keys.** `SETNX` with TTL guarding the Trigger.dev → Spring calls. Directly solves replay from durable retries.

**Nudge cooldowns.** "Do not nudge this user about this pattern again for 6 hours" is a key with a TTL and nothing more. See [[Nudge Policy]].

**L1 in front of `llm_call`.** Findings stay durable in Postgres for audit and replay; Redis serves the hot lookups.

## Not for

Job queues. Trigger.dev owns that. Do not add a parallel Spring `@Async` plus Redis queue — you will end up with three systems that all look like queues and no clear ownership.
