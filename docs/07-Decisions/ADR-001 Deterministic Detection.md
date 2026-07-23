---
tags: [adr]
status: accepted
---

# ADR-001 — Detection stays deterministic

## Context

Agents are central to the design. The obvious move is to let an agent read trade history and find behavioural patterns.

## Decision

Pattern detection is deterministic Java. Agents interpret, teach, and research — they never decide what happened.

**Rules are the sensors. Agents are the reasoning.**

## Rationale

- **Mastery depends on it.** If an agent judges deal #40912 to be revenge trading today and not tomorrow, `concept_mastery` becomes noise and the claim "we can show you learned something" collapses. See [[Mastery State Machine]].
- **Cost and latency.** 340 deals per import, an agent run per detection window, on every re-import.
- **Explainability.** The user can be shown the exact rule and threshold that fired. "The AI thinks you were tilting" is unarguable and therefore useless.
- **Regression testing.** Deterministic rules can be tested against a fixture account. Agent judgement cannot.

## The escape hatch

Agents may **propose** rules offline — conditions, thresholds, a name — stored with `status = proposed`. After human approval via a Trigger.dev waitpoint, they execute deterministically forever. Adaptive discovery, reproducible execution. See [[Detection Engine]].

## Consequences

Rule authoring is manual work. Accepted.
