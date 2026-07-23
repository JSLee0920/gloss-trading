---
tags: [data]
---

# Concept Taxonomy

Hand-written, fixed, versioned in migrations. **Never LLM-generated** — see [[ADR-005 Fixed Concept Taxonomy]].

Roughly 25 concepts. Seed list below; refine before Phase 4.

## Shared core

| Code | Name |
|---|---|
| `SIZING_AFTER_LOSS` | Position sizing after a loss |
| `RISK_PER_TRADE` | Consistent risk per trade |
| `STOP_PLACEMENT` | Stop placement relative to volatility |
| `PLAN_ADHERENCE` | Trading the plan you wrote |
| `LOSS_ACCEPTANCE` | Accepting a loss without re-entry |
| `OVERTRADING` | Trading frequency versus opportunity |
| `SESSION_DISCIPLINE` | Trading only in your effective hours |
| `RECORD_KEEPING` | Reviewing before repeating |
| `EXPECTANCY` | Understanding expectancy over win rate |
| `DRAWDOWN_RESPONSE` | Behaviour during drawdown |

## Forex and crypto (intraday)

| Code | Name |
|---|---|
| `NEWS_SPIKE_ENTRY` | Entering into a scheduled news spike |
| `LEVERAGE_CREEP` | Leverage escalation over a session |
| `SPREAD_AWARENESS` | Cost of entry in wide-spread conditions |
| `CORRELATION_STACKING` | Stacking correlated pairs as one bet |
| `WEEKEND_GAP_RISK` | Holding through a gap window |
| `VOLATILITY_REGIME` | Sizing to the current regime |
| `RETEST_PATIENCE` | Waiting for confirmation |

## Investment (long hold)

| Code | Name |
|---|---|
| `PANIC_SELLING` | Selling into a drawdown |
| `CONCENTRATION_RISK` | Position weight versus portfolio |
| `PERFORMANCE_CHASING` | Buying after a run |
| `REBALANCING` | Rebalancing discipline |
| `WINNER_TRIMMING` | Selling winners too early |
| `COST_DRAG` | Fees, spreads and turnover |
| `THESIS_DRIFT` | Holding after the reason expired |
| `TIME_HORIZON_MATCH` | Instrument choice versus horizon |

## Rules

- A concept maps to one or more rules; a rule maps to exactly one concept
- `prerequisite_id` builds the ordering used by the curriculum — do not surface `EXPECTANCY` before `RISK_PER_TRADE`
- Adding a concept is a migration, not a config change
