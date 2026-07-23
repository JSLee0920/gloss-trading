---
tags: [feature, phase-3]
---

# F5 — Non-Defensive Diff

The single most important design decision in the product.

## The problem

If the app says "you traded emotionally," the trader argues. Defensiveness ends learning.

## The mechanism

Never assert a judgement. Search the user's **own history** for the same setup with a better outcome, and present the contrast:

> On 3 Feb you were also stopped on gold in high volatility. You waited four hours and took one normal-size entry. It won.

Same trader, same setup, different behaviour. The criticism comes from their own track record, so there is nothing to push back against.

## Selecting the contrast

Match on: instrument or asset class, volatility regime, and preceding outcome (a loss). Prefer a winning position where the rule that fired *did not* fire. Rank by similarity, take the best one.

If no contrast exists, fall back to a neutral framing — never fabricate a comparison.

Stored in `comparison`, linked to the finding.
