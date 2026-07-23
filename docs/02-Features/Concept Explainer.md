---
tags: [feature, phase-4]
---

# F10 — Concept Explainer

**Brief coverage:** *"Explains concepts using examples from products they actually trade."*

## The gap this fills

[[Findings]] explains a concept only when a detection fires. But a user browsing [[Mastery and Curriculum]] will click a concept with no recent detection, and prerequisite concepts must be teachable before they have been violated.

## How it differs from generic education

Every example is drawn from the user's own instruments and their own price history. A trader who only touches gold and synthetics never sees a EUR/USD example.

Selection order for the illustrating example:

1. The user's own trade demonstrating the concept — best case
2. The user's own trade where the concept was *nearly* relevant
3. A real historical move on an instrument they trade, no position attached
4. Generic — only if all three fail, and flagged internally as a quality miss

Rule 4 firing often means the taxonomy is too abstract for this user's actual trading.

## Adaptation

Length, formality, and whether the explanation leads with the example or the principle come from [[Learner Profile]].

## Output

Cached like findings, keyed on (concept, chosen example, style profile version, template version). Stored in `llm_call`.
