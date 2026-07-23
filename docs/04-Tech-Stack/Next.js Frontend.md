---
tags: [tech]
---

# Next.js Frontend

## Key screens

| Screen | Phase | Notes |
|---|---|---|
| Upload / column mapping | 1 | the whole onboarding promise lives here |
| Trade list | 1 | filter by symbol, outcome, date |
| Chart replay | 1 | `lightweight-charts`, highest-impact visual in the product |
| Stats | 2 | win rate by hour, symbol, size, hold time |
| Detection feed | 2 | severity-ranked, evidence linked |
| Lesson | 3 | commit-before-reveal, see [[Socratic Replay]] |
| Curriculum | 4 | shaky concepts ranked by cost |
| Tutor chat | 4 | streamed from a Trigger.dev task |

## Realtime

Import progress and tutor responses stream from Trigger.dev directly via its React hooks — no polling, no custom API routes for those paths.

## Chart library

`lightweight-charts`. Budget real time for it: the replay interaction is the single most important visual in the product, and hiding future candles cleanly is fiddlier than it looks.
