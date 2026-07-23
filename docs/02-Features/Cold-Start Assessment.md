---
tags: [feature, phase-4]
---

# F9 — Cold-Start Assessment

**Brief coverage:** *"Assesses what the trader already knows and what they need to learn."*

## The gap this fills

[[Mastery State Machine]] only learns by observing. A new user starts every concept at `unseen`, so the first curriculum is empty until enough detections accumulate. That is a dead first session.

## Two sources, run at import

**Inferred from behaviour (primary).** The statement itself is an assessment. Before any lesson exists, run the full rule catalogue and derive an opening position: concepts with detections start `shaky`; concepts whose preconditions occurred repeatedly with no detection start `assumed_solid`.

**Declared by the user (secondary).** A short onboarding — instruments traded, years active, self-rated familiarity with 6–8 concept groups, and goals. Five questions, not a quiz.

Where the two disagree, **behaviour wins** and the disagreement is itself a teaching moment: a trader who rates themselves confident on position sizing while `SIZE_ESCALATION` fires eleven times is the highest-value lesson in the product.

## Data

`assessment` records the run and the declared answers. `concept_mastery.confidence_source` distinguishes `assessed` from `observed`. An assessed state is provisional — the first real detection overrides it and never counts as a regression.

## Constraint

Never present the assessment as a score or a level. No "you are an intermediate trader." It seeds the curriculum silently; the user sees the curriculum, not the grade.
