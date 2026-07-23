---
tags: [logic]
---

# Nudge Policy

Phase 5. The feature most likely to make users uninstall if it is wrong.

## Principles

- **Advisory, never blocking.** The system does not restrict trades. See [[Non-Goals]].
- **Never during an open position's first minutes.** Interrupting an entry is the most intrusive possible moment.
- **One nudge per pattern per cooldown window.** Default 6 hours, Redis key with TTL.
- **Daily cap.** Maximum 3 nudges per user per day regardless of detections.
- **Silence on the first occurrence** of a pattern the user has never seen explained. Explain it in the review flow first, nudge only on recurrence — otherwise the first nudge arrives with no context and reads as an accusation.

## Content rules

Same tone contract as [[Finding Generation]]. State the observation and the number, offer no instruction.

> Third entry on gold since the 15:42 loss. Your median in this situation is one.

Not: "Stop trading, you are on tilt."

## Celebration nudges

[[Positive Patterns]] detections are deliverable too, and count against the same daily cap. One per week maximum — celebration that arrives constantly is noise, and noise is what gets the whole channel muted.

Never celebrate a profitable outcome. Only held process.

## Breaks and limits

When severity is high and detections cluster inside a short window, the nudge may suggest a pause or a self-set limit. It suggests; it never enforces, and it never sets a limit on the user's behalf. The user leaves with a choice, always.

## Escalation

Severity affects *whether* it fires, never how insistent it is. There is no shouting mode.

## Kill switch

A per-user global mute, discoverable in one click, honoured immediately. A coach you cannot silence is a nag, and the product's entire premise is that the user stays willing to listen.
