---
tags: [tech]
---

# Spring Boot

Java 21. The source of truth for everything in [[ERD]].

## Owns

- Schema and migrations (Flyway)
- Deal normalisation and position reconstruction
- Detection rule execution — [[Detection Rules]]
- Mastery state transitions — [[Mastery State Machine]]
- Auth, users, accounts
- The outbox relay to Kafka

## Libraries

| Need | Library |
|---|---|
| MT4/MT5 HTML report parsing | jsoup |
| XLSX parsing | Apache POI |
| CSV parsing | OpenCSV |
| HTTP to data providers | `java.net.http.HttpClient` |
| LLM calls from Java (if any) | Spring AI |
| Kafka | Spring for Apache Kafka |
| Migrations | Flyway |

Phases 1 and 2 are **100% Java** — statement import and deterministic rules need nothing else.

## Idempotency

Every endpoint a Trigger.dev task calls must be idempotent. Durable retries replay steps. Enforce with a natural key on the Java side (`external_deal_id`, `dedupe_hash`) plus a Redis `SETNX` guard. See [[Redis]].

## Where Java is thin

Real multi-agent orchestration. Spring AI handles tool-calling loops fine, but planner-plus-subagent topologies belong in TypeScript on Trigger.dev. That is the division — see [[Trigger Dev]].
