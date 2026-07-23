---
tags: [tech]
---

# Trigger.dev

TypeScript-native durable task platform. Enters at Phase 3.

Chosen because it removes the need for a separate Python agent service — TypeScript is already in the stack via [[Next.js Frontend]].

## What it gives

- Long-running tasks with no timeout
- Durable retries, queues, idempotency keys
- Cron schedules
- `batchTrigger` for fan-out
- Waitpoints for human-in-the-loop
- Realtime streaming to the frontend via React hooks
- Build extensions that run Python scripts inside a task
- Self-hostable (Docker Compose or Kubernetes, Apache 2.0), or cloud free tier

Checkpoint-resume rather than event-sourced replay — no determinism constraints on task code, but **steps can re-execute**. See idempotency in [[Spring Boot]].

## Tasks

| Task | Trigger | Notes |
|---|---|---|
| `import-statement` | upload | column-mapping agent, normalise, dedup, fan out; streams progress to the upload screen |
| `backfill-candles` | `TradesImported` | batched, concurrency key per data source to respect rate limits |
| `generate-finding` | `DetectionCreated` | `batchTrigger`, one run per detection |
| `market-context-agent` | called by finding generation | tool-calling over news and the economic calendar |
| `daily-refresh` | cron | new candles, re-run detections, update mastery |
| `tutor-session` | user opens chat | realtime streaming |
| `propose-rules` | cron, monthly | emits candidate rules, then **pauses on a waitpoint until approved** |

`propose-rules` is the payoff: adaptive rule discovery with a human gate, which is exactly the shape of their human-in-the-loop primitive. See [[Detection Engine]].

## Boundary

Tasks call Spring over internal HTTP with a service token. They never touch Postgres.
