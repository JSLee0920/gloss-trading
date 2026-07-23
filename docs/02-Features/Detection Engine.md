---
tags: [feature, phase-2]
---

# F2 — Detection Engine

Plain Java over sorted deals. No LLM anywhere in this path. See [[ADR-001 Deterministic Detection]] for why this is non-negotiable.

Rules are the **sensors**. Agents are the **reasoning**. A sensor that returns a different reading each time it is polled is not a sensor.

## What it produces

`detection` rows: rule, severity, time window, evidence deal ids, dedupe hash.

## Rule catalogue

Thresholds are per asset class — see [[Detection Rules]] and [[Asset Class Profiles]].

## The stats page

Ships in the same phase and needs zero AI: win rate by hour of day, by symbol, by size bucket, by hold time. This alone is a usable product. Ship it before touching an LLM.

## Agent-proposed rules

An offline agent reads full history, spots something the catalogue misses, and emits a **candidate rule definition** — conditions, thresholds, a name. Stored in `rule` with `status = proposed`. It executes deterministically only after human approval.

Adaptive discovery, reproducible execution. Implemented as a Trigger.dev waitpoint — see [[Trigger Dev]].
