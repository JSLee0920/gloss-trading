---
tags: [adr]
status: accepted
---

# ADR-002 — Trigger.dev as the orchestration layer

## Context

Agent workloads need durable execution, retries, fan-out, scheduling, and streaming to the frontend. Java's multi-agent ecosystem is thin. The alternative was a Python agent service alongside Spring Boot.

## Decision

Trigger.dev owns orchestration and all agent execution. No Python service.

## Rationale

- TypeScript is already in the stack via Next.js — no third language
- Durable tasks with no timeout, retries, queues, idempotency keys, cron, `batchTrigger`, waitpoints
- Realtime streaming to the frontend without custom polling
- Build extensions run Python scripts *inside* a task, which covers MT5 and Dukascopy tooling without a standing service
- Self-hostable under Apache 2.0, or the cloud free tier

## Boundary

Trigger.dev tasks call Spring over internal HTTP with a service token. **TypeScript never writes to Postgres.** Two writers in two languages against one schema will drift.

## Consequences

- Steps re-execute on retry (checkpoint-resume, not event-sourced replay). Every Spring endpoint a task touches must be idempotent.
- Agent prompts live in TypeScript while domain logic lives in Java. Mitigated by keeping the concept taxonomy and rule definitions **in Postgres**, so both sides read one source. Do this before writing the first prompt.
