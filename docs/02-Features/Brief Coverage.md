---
tags: [features, audit]
---

# Brief Coverage

Audit of every bullet in the two source briefs against the vault. Gaps found here drove F9–F13 and [[Learner Profile]].

## Personalised Trading Education

| Brief bullet | Covered by | Was |
|---|---|---|
| Assesses what they know and need to learn | [[Cold-Start Assessment]] | **missing** — mastery only learned by observation, so first session was empty |
| Explains concepts using products they actually trade | [[Concept Explainer]] | **missing** — explanation only existed attached to a detection |
| Breaks down their own past trades to teach lessons | [[Findings]], [[Socratic Replay]] | covered |
| Adapts explanation style to how they learn best | [[Learner Profile]] | **missing** — no model of the learner at all |
| Personalised curriculum based on their goals | [[Learner Profile]], [[Mastery and Curriculum]] | partial — curriculum ranked by cost only, goals unmodelled |

## Intelligent Trading Analyst — market analysis

| Brief bullet | Covered by | Was |
|---|---|---|
| Explain significant price movements | [[Market Analysis]] | partial — context existed only around a trade, not standalone |
| Identify technical patterns, explain plainly | [[Market Analysis]] | **missing** — no technical rule kind |
| Summarise relevant news per instrument | [[Market Analysis]] | partial — sources listed, no feature |
| Sentiment from multiple sources | [[Market Analysis]] | **missing** |
| Personalised briefs for followed instruments | [[Market Analysis]] | **missing** — no watchlist existed |

## Intelligent Trading Analyst — behavioural

| Brief bullet | Covered by | Was |
|---|---|---|
| Detect emotional or impulsive trading | [[Detection Engine]], [[Detection Rules]] | covered |
| Gentle, timely nudges | [[Nudge Policy]] | covered |
| Recognise winning **and** losing patterns | [[Positive Patterns]] | **missing** — every rule was a failure mode |
| Suggest breaks, limits, reflection | [[Nudge Policy]] | partial — now explicit |
| Celebrate sustainable habits, not profits | [[Positive Patterns]] | **missing** |

## Intelligent Trading Analyst — social

| Brief bullet | Covered by | Was |
|---|---|---|
| AI analyst personas | [[Content Studio]] | partial |
| Platform-appropriate content | [[Content Studio]] | partial |
| Shareable posts from analysis | [[Content Studio]] | partial |
| Daily/weekly summaries, educational threads | [[Content Studio]] | **missing** |
| Consistent voice across personas | [[Content Studio]] | **missing** — needed a versioned persona definition |
| Content calendars | [[Content Studio]] | **missing** |

## Judgement calls made against the briefs

**"Celebrate sustainable trading habits, not just profits"** is implemented as celebrating *process only*, with P&L excluded as an input. A profitable trade taken badly is not celebrated. See [[Positive Patterns]].

**"Real time"** market explanation arrives at Phase 6, not Phase 1. Everything through Phase 4 works on uploaded history, which is the correct order for earning trust.

**Sentiment** is reported as attributed counts with sources, never a single score. False precision is the thing this product argues against.

**Nothing auto-publishes.** The briefs describe personas that post; the vault requires human approval on every item. See [[Content Studio]].
