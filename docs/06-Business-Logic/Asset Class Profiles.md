---
tags: [logic]
---

# Asset Class Profiles

`instrument.asset_class` drives everything downstream. Thresholds live in `rule_profile`, not in code.

## Why this exists

"Three entries in thirty minutes" is revenge trading in forex, unremarkable in crypto, and meaningless for someone holding equities. One global threshold misfires everywhere.

## Profiles

| | forex | crypto | equity / investment | index / commodity |
|---|---|---|---|---|
| Sessions | 24/5, session-aware | 24/7, no sessions | market hours, gaps | contract hours, rollover |
| Default timeframe | 1m / 5m | 1m / 5m | 1d | 5m / 1h |
| `REVENGE_SEQUENCE` W | 30 min | 60 min | n/a | 30 min |
| `SIZE_ESCALATION` K | 1.5 | 2.0 | n/a | 1.5 |
| Typical hold | minutes–hours | minutes–days | weeks–years | hours–days |
| Data source | Dukascopy | Binance | yfinance | yfinance |

## Two behavioural products

Do not force one rule set across both.

**Intraday (forex, crypto)** failure modes: revenge, overleverage, overtrading, missing stops, news-spike chasing.

**Investment (equities, funds)** failure modes: panic selling in drawdown, concentration, performance chasing, selling winners early, never rebalancing, thesis drift.

Different rules, different concepts, different time resolution. Same pipeline, different profile. The investment rule set is effectively a second project — see the sequencing note in [[Phases]].

## Corporate actions

Equities need split and dividend adjustment before any historical comparison is valid. Forex and crypto do not. This alone justifies not building investment support until the intraday path is proven.
