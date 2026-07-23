---
tags: [logic]
---

# Detection Rules

Pure Java over deals sorted by `executed_at`. No LLM. See [[ADR-001 Deterministic Detection]].

## Three rule kinds

`rule.kind` separates them; all three are deterministic.

| Kind | Fires on | Note |
|---|---|---|
| `behavioural` | failure modes below | the original catalogue |
| `positive` | restraint and consistency | [[Positive Patterns]] |
| `technical` | price structure and indicator states | [[Market Analysis]] |

`detection.polarity` is derived from kind and drives whether the finding is framed as a lesson or a habit held.

Thresholds below are **forex defaults**. Per-class overrides live in `rule_profile` — see [[Asset Class Profiles]].

## REVENGE_SEQUENCE

A realised loss, then N or more new entries on the same instrument within window W.

- default: N = 2, W = 30 min
- severity scales with count and with size relative to median
- concept: `SIZING_AFTER_LOSS`

## SIZE_ESCALATION

Entry volume greater than K times the trader's trailing-30-day median volume, opened within W of a realised loss.

- default: K = 1.5, W = 60 min
- concept: `SIZING_AFTER_LOSS`

## OVERTRADING_DAY

Trade count on a day exceeding M times the trailing weekly average.

- default: M = 2, minimum 6 trades to fire
- concept: `OVERTRADING`

## SESSION_DECAY

Win rate in an hour-of-day bucket materially below the trader's own baseline over a minimum sample.

- default: minimum 20 trades in bucket, gap of 15 percentage points
- concept: `SESSION_DISCIPLINE`

## NEWS_SPIKE_ENTRY

Entry within X minutes of a scheduled high-impact event, into a bar whose range exceeds Y times the trailing average true range.

- default: X = 5 min, Y = 3
- concept: `NEWS_SPIKE_ENTRY`

## NO_STOP

Position held with no stop loss recorded, and adverse excursion beyond Z times the trader's median risk.

- default: Z = 2
- concept: `STOP_PLACEMENT`

## CORRELATION_STACKING

Simultaneous open positions in instruments above a correlation threshold, aggregate exposure exceeding the trader's normal single-position risk.

- concept: `CORRELATION_STACKING`

## Output contract

Every rule emits:

- `rule_id`, `rule_version`
- `severity` (low / medium / high) with a numeric rationale
- `window_start`, `window_end`
- evidence deal ids → `detection_deal`
- `realized_cost` — the P&L attributable to the window
- `dedupe_hash`

## Minimum sample discipline

No rule fires on fewer than its stated minimum. A false pattern shown in the first session destroys trust permanently, and trust is the entire product.
