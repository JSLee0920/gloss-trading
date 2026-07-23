---
tags: [logic]
---

# Learner Profile

**Brief coverage:** *"Adapts explanation style to how they learn best"* and *"creates a personalised curriculum based on their goals."*

The gap this fills: nothing else in the system models the *learner*. It models the trader. Those are different, and the brief asks for both.

## Style dimensions

Four, deliberately few. More becomes unmeasurable.

| Dimension | Values | Default |
|---|---|---|
| `lead_with` | example / principle | example |
| `depth` | brief / standard / thorough | standard |
| `formality` | plain / technical | plain |
| `numbers` | minimal / heavy | standard mix |

Applied to [[Concept Explainer]], [[Findings]] rendering, and lesson prompt phrasing. Never to detection, never to the tone contract — those are fixed.

## How values are set

**Declared** at onboarding via [[Cold-Start Assessment]], then **revised by behaviour**:

- Lessons abandoned before reveal → shorten `depth`
- Expanding "show the numbers" repeatedly → `numbers: heavy`
- Skipping the principle block → `lead_with: example`

Revision is slow and bounded — a preference needs several consistent signals to move. Style that changes every session feels broken rather than adaptive.

## Goals

Free text at onboarding, normalised into a small fixed set: `stop_losing`, `consistency`, `grow_account`, `learn_analysis`, `go_full_time`.

Goals reweight curriculum ordering; they never unlock or hide concepts. A trader whose goal is `consistency` sees `RISK_PER_TRADE` and `PLAN_ADHERENCE` promoted above `EXPECTANCY` — the same list, reordered.

## Honesty constraint

If the goal is unrealistic, the product does not adjust the curriculum to flatter it. `go_full_time` reorders the syllabus; it does not change what the detections say. See [[Non-Goals]].

## Data

`learner_profile`, one row per user, with a version so cached explanations invalidate when style changes.
