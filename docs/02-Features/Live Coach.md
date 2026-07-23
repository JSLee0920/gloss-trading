---
tags: [feature, phase-5]
---

# F7 — Live Coach

Everything before this works on an uploaded file. Phase 5 runs the same rules against positions open **right now**.

"This is what you did in March" becomes "this is your third entry since the loss twenty minutes ago."

## Requires

A live connection — the MetaTrader5 Python package against a local terminal, or broker polling. Runs as a Python script inside a Trigger.dev task via build extensions, not as a separate service. See [[Data Sources]].

## Delivery discipline

Nudges are advisory only. Never blocking. Hard cooldowns per user per pattern. Full policy in [[Nudge Policy]].

## Why last

It is the only feature that needs real-time infrastructure, and it is worthless until the detection rules are trustworthy. Trust is earned on historical data first.
