---
tags: [adr]
status: accepted
---

# ADR-003 — Kafka over RabbitMQ

## Context

A message broker is in the stack. The events are `TradesImported`, `DetectionCreated`, `FindingCreated`, `LessonCompleted` — genuine fan-out with multiple consumers.

## Decision

Kafka.

## Rationale

One reason dominates: **`concept_mastery` is a projection.** The promotion logic will be rewritten many times — clean-opportunity counting, per-concept thresholds, regression handling. With a retained log the events replay and mastery rebuilds from scratch. With a transient broker they are gone and the only recovery is recomputing from raw deals, which loses lesson and nudge history.

Secondary: prior Kafka experience means low adoption cost.

## Consequences

- Heavier local infrastructure. Mitigated by not introducing Kafka until Phase 4, when `DetectionCreated` actually has a second consumer. See [[Cut Lines]].
- Requires a transactional outbox so Postgres writes and event publication cannot diverge. See [[Kafka Events]].
- Consumers must never block on LLM calls — they fire a Trigger.dev task and return.
