---
tags: [feature, phase-4]
---

# F6 — Mastery and Curriculum

## Concepts

A hand-written taxonomy of roughly 25 concepts — see [[Concept Taxonomy]]. Fixed, because an LLM will otherwise name the same concept four ways and mastery tracking becomes noise.

## States

- **unseen** — never came up
- **shaky** — a detection tied to it fired
- **solid** — it fired before, and later trades in the same conditions did not repeat it

Promotion comes from behaviour, not from a quiz. State machine and promotion conditions in [[Mastery State Machine]].

## Why this matters

It is the answer to "how do you know someone actually learned something?" — a question generic education cannot answer at all. It is also the retention loop: the curriculum changes as you trade.

## Curriculum screen

Shaky concepts ranked by realised cost, each linked to the deals that prove it. Not a course outline — a debt list.

## Rebuildability

`concept_mastery` is a **projection**, not a source of truth. You will rewrite promotion logic repeatedly. Rebuild it by replaying the Kafka log. See [[ADR-003 Kafka over RabbitMQ]].
