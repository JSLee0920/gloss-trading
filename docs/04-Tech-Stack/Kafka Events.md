---
tags: [tech]
---

# Kafka Events

Enters at Phase 4, when `DetectionCreated` gets its second consumer.

## Why Kafka and not RabbitMQ

`concept_mastery` is a **projection**, not a source of truth. The promotion logic will be rewritten many times. With a retained log the events replay and mastery rebuilds from scratch. With a transient broker those events are gone. See [[ADR-003 Kafka over RabbitMQ]].

## Topics

| Event | Emitted by | Consumers |
|---|---|---|
| `TradesImported` | import | candle backfill, detection run, stats rebuild |
| `CandleBatchLoaded` | backfill | detection re-run for affected deals |
| `DetectionCreated` | rule engine | finding generation, nudge evaluation, mastery re-eval |
| `FindingCreated` | finding task | lesson generation, social renderer, notification |
| `LessonCompleted` | tutor | mastery update, curriculum re-rank |
| `MasteryChanged` | mastery projector | curriculum re-rank, notification |

## Transactional outbox

Spring writes the domain row **and** an outbox row in one transaction. A relay publishes to Kafka and marks it sent.

Without this you will eventually have a detection in Postgres with no event, or an event for a row that rolled back. Table defined in [[Table Reference]].

## Consumer discipline

Fast and internal work runs in the consumer. Slow, external, or LLM work fires a Trigger.dev task and returns. Never block a consumer on an LLM call.
