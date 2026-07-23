---
tags: [adr]
status: accepted
---

# ADR-005 — The concept taxonomy is fixed and hand-written

## Context

Concepts could be generated per user by the LLM, which would be more "personalised."

## Decision

Roughly 25 concepts, hand-written, versioned in migrations. The model may only select from the list.

## Rationale

An LLM will name the same concept four different ways — "revenge trading," "emotional re-entry," "trading on tilt," "loss chasing." With free-text concepts:

- `concept_mastery` cannot aggregate; every user has a unique vocabulary
- Prerequisite ordering is impossible, so the curriculum cannot sequence
- Progress cannot be compared across time for one user, let alone across users
- Rules cannot map to concepts, breaking the promotion signal

Personalisation comes from **which** concepts surface and **which of the user's trades** illustrate them — not from inventing new vocabulary.

## Consequences

- Adding a concept is a migration. Deliberate friction.
- Finding generation must validate `concept_code` against the taxonomy and retry on an unknown value. See [[Finding Generation]].
- The taxonomy is stored in Postgres so Java and the TypeScript agents read one source.
