---
tags: [feature, phase-2]
---

# F11 — Positive Patterns

**Brief coverage:** *"Help traders recognise their own winning and losing patterns"* and *"Celebrate sustainable trading habits, not just profits."*

## The gap this fills

Every rule in [[Detection Rules]] is a failure mode. A product that only ever tells you what you did wrong is one users leave — and it misreads the brief, which asks for both directions.

## Mechanism

Same engine, opposite sign. Add `polarity` to `detection` and `kind` to `rule`. Positive rules fire on restraint and consistency, never on profit.

| Rule | Fires on |
|---|---|
| `CLEAN_RECOVERY` | A realised loss followed by no re-entry within the revenge window |
| `SIZE_CONSISTENCY` | N consecutive entries within a tight band of median risk |
| `PLAN_HELD` | Stop and target respected without mid-trade edits |
| `SESSION_RESTRAINT` | No trades taken in the user's statistically worst hour, over a period |
| `DRAWDOWN_COMPOSURE` | Volume and frequency unchanged through a losing streak |

## The critical rule: never celebrate profit

A winning trade taken with triple size after a loss is a failure that happened to pay. Celebrating it teaches the behaviour that will eventually empty the account.

Positive detections fire on **process only**. P&L is never an input to a positive rule. This is the same principle that keeps P&L uncoloured in the UI.

## Where it surfaces

- Clean opportunities already drive promotion in [[Mastery State Machine]] — this makes them visible rather than silent
- A weekly summary of held habits, not a streak counter with a flame icon
- One celebration nudge maximum per week, subject to [[Nudge Policy]] caps
