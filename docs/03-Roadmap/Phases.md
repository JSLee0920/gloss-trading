---
tags: [roadmap]
---

# Phases

Solo build, no fixed deadline. Each phase must produce something usable on its own.

## Phase 1 — Import and see

Goal: drop in a statement, see your trades on a chart.

- [[Statement Import]]: HTML, XLSX, CSV with column mapper
- Deal normalisation, position reconstruction, dedup
- Candle backfill for symbols and date ranges found
- Trade list plus one replayable chart with entry/exit markers
- Session auth only

**No LLM. No Kafka. No Redis. No Trigger.dev.** Spring Boot, Postgres, Next.js.

## Phase 2 — Detection engine

Goal: a stats page that tells you something you did not know.

- Rule catalogue: [[Detection Rules]]
- `detection` rows with severity and evidence
- [[Positive Patterns]] — same engine, opposite sign
- Stats: win rate by hour, symbol, size bucket, hold time

Still no LLM. **This is the first genuinely useful build.**

## Phase 3 — Findings and tutor

Goal: the loop that makes it a tutor.

- [[Findings]] generation with prompt-hash caching
- [[Socratic Replay]]
- [[Non-Defensive Diff]]
- Redis enters here — LLM cache, rate limits, spend caps
- Trigger.dev enters here — long-running import and fan-out

## Phase 4 — Mastery and curriculum

- [[Concept Taxonomy]] seeded by hand
- [[Cold-Start Assessment]] — so the first session is not empty
- [[Learner Profile]] — style dimensions and goals
- [[Concept Explainer]]
- [[Mastery State Machine]]
- Curriculum screen, ordered by cost and reweighted by goals
- Kafka enters here — `DetectionCreated` finally has more than one consumer

## Phase 5 — Live coach

- [[Live Coach]], live broker connection
- [[Nudge Policy]] with cooldowns

## Phase 6 — Analyst and social

- [[Market Analysis]] — move explanations, technical rule kind, news, sentiment, watchlist briefs
- [[Content Studio]] — personas, platform renderers, calendar, anonymisation gate

Overview in [[Analyst and Social]]. Neither starts until the Phase 1–4 loop demonstrably retains users.

## Asset class sequencing

Forex end to end first — highest density of behavioural signal per unit time, free tick data, fastest rules to validate. Then crypto: same rules, retuned thresholds, free Binance data. Investment last, since it is effectively a second rule set and a second taxonomy. See [[Asset Class Profiles]].
