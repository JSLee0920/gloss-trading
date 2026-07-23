---
tags: [feature, phase-6]
---

# F12 — Market Analysis

**Brief coverage:** *"Explain significant price movements,"* *"identify technical patterns,"* *"summarise relevant news,"* *"sentiment analysis,"* *"personalised market briefs."*

Phase 6. Everything here explains; nothing forecasts. See [[Non-Goals]].

## Move explanation

*"Why did XAU/USD just move?"* Detect a move exceeding N times trailing ATR, then run `market-context-agent`: scheduled events in window, news retrieval, correlated instrument moves, session context.

Output states what coincided with the move. It never claims cause where only correlation exists, and it says so when the answer is unclear — "no scheduled event or notable headline in this window" is a valid and honest output.

## Technical patterns

A **third rule kind** (`kind = technical`), still deterministic. Classical formations and indicator states computed in Java: trend structure, range compression, ATR regime, moving-average relationships, volume anomaly.

The LLM explains significance in plain language. It never detects the pattern and never says what to do about it.

Detected patterns are also the raw material for [[Concept Explainer]] example selection.

## News and sentiment

GDELT plus RSS, filtered to instruments on the user's watchlist. Sentiment is **aggregated and attributed** — "of 14 items retrieved, 9 lean negative" with sources — not a single confident number. A sentiment score with no provenance is the kind of false precision this product exists to argue against.

## Personalised briefs

Daily or weekly, only for watchlist instruments. Structure: what moved and what coincided with it, what is scheduled ahead, and — the differentiator — **one line connecting market conditions to the user's own patterns**, drawn from [[Mastery and Curriculum]].

> High-volatility session ahead on gold. Your `SIZE_ESCALATION` detections cluster in exactly these conditions.

That line is the entire reason this feature belongs in Gloss rather than in any market app.

## Data

`watchlist` for followed instruments, `market_brief` for generated briefs. Briefs are regenerable — cache, do not treat as source of truth.
