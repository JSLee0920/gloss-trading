---
tags: [feature, phase-3]
---

# F4 — Socratic Replay

The lesson is not a paragraph of advice. It is a chart.

## Flow

1. Chart loads at the anchor moment — say the second entry at 15:47 — with **all future candles hidden**
2. Prompt: *"You had just been stopped out. What did you see here?"*
3. User commits an answer in a text box
4. Candles play forward
5. The finding is revealed **against what they said**

## Why commit-before-reveal

A trade you lived through is memorable in a way a textbook diagram never is. But the user already knows the outcome — so the value is entirely in making them state a reason *before* seeing it. Skip the commit step and this degrades into a replay animation with a caption.

## Implementation

- `lightweight-charts` on the Next.js side
- Candles served from Postgres via Redis cache, never fetched from a data provider at page load
- `lesson` holds the anchor timestamp and prompt; `lesson_response` holds the user's answer and reveal time

## Measuring learning

The answer text is **not** graded. Learning is measured by later behaviour only — see [[Mastery State Machine]].
