---
tags: [data]
---

# Table Reference

Diagram in [[ERD]]. Only the non-obvious decisions are recorded here.

## deal

The grain of the whole system. **One row per broker fill**, not per position.

- Natural key `(account_id, external_deal_id)` — unique, makes re-uploading an overlapping statement a no-op
- `position_id` is nullable and assigned during reconstruction, not at parse time
- `entry_type` distinguishes in / out / in-out (partial close), which is how you detect scale-ins

## position

Derived from deals, never imported directly. Recomputable — if reconstruction logic changes, drop and rebuild.

`max_adverse` and `max_favorable` come from the candle data, not the statement, and require the backfill to have run.

## candle

- Composite PK `(instrument_id, timeframe, ts)`
- **Range-partition on `ts` from day one.** Millions of rows per symbol per timeframe; retrofitting partitioning later is painful.
- Historical bars are immutable — safe to cache indefinitely in [[Redis]]

## rule / rule_profile

`kind` is `behavioural`, `positive`, or `technical`. It drives `detection.polarity`, which decides whether a finding is framed as a lesson or a habit held. All three kinds are deterministic — see [[ADR-001 Deterministic Detection]].

`rule.definition` holds conditions as JSON so both Java and the TypeScript agents read one source. `rule_profile` holds asset-class thresholds — see [[Asset Class Profiles]].

`source` is `handwritten` or `agent_proposed`; `status` gates execution. Agent-proposed rules never run before approval.

`version` is denormalised onto `detection` so a threshold change does not silently rewrite history.

## detection

`dedupe_hash` = hash of (rule code, rule version, ordered deal ids). Unique. Re-running detection is idempotent, which matters because Trigger.dev retries will replay it.

`realized_cost` is what the curriculum ranks by.

## finding

`prompt_hash` unique — the cache key. Same detection and candle window always yields the same finding without a second LLM call.

`concept_id` must resolve against the fixed taxonomy; reject and retry generation if the model returns an unknown code. See [[ADR-005 Fixed Concept Taxonomy]].

## concept_mastery

A **projection**. Rebuildable by replaying [[Kafka Events]]. Never the only copy of anything.

`confidence_source` is `assessed` or `observed`. Assessed states are provisional; the first real detection overrides one without counting as a regression.

`clean_opportunities` counts situations where the rule could have fired and did not — the promotion signal. See [[Mastery State Machine]].

## learner_profile

One row per user. `version` bumps on any change so cached explanations invalidate — see [[Learner Profile]]. Style never affects detection, only rendering.

## assessment

Stores both halves of [[Cold-Start Assessment]]: what the user declared and what the statement implied. Kept for the disagreement itself, which is a teaching input.

## watchlist

Followed instruments. Drives [[Market Analysis]] briefs and news filtering. Distinct from instruments the user has traded — people watch more than they trade.

## market_brief

Regenerable cache, not source of truth. Safe to truncate.

## persona / content_post

`voice_definition` holds vocabulary rules, sentence-length band, forbidden phrases and worked examples — versioned, so a voice change is deliberate rather than prompt drift.

`content_post.status` gates publication: `draft` → `approved` → `scheduled` → `published`. `approved_at` is set only by human review. Nothing auto-publishes. See [[Content Studio]].

## outbox

Written in the same transaction as the domain row. A relay publishes and stamps `published_at`. Index on `published_at IS NULL`.

## llm_call

Audit and cost tracking as much as cache. Keep `response` raw — you will want to re-render old findings with new prompts without re-paying.
