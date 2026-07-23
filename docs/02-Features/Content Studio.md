---
tags: [feature, phase-6]
---

# F13 — Content Studio

**Brief coverage:** *"AI analyst personas,"* *"platform-appropriate content,"* *"shareable posts,"* *"daily/weekly summaries and educational threads,"* *"consistent voice,"* *"content calendars."*

Phase 6, and the last thing built. See [[Cut Lines]].

## Personas

Two, maximum. Three reads as padding.

| Persona | Voice | Suits |
|---|---|---|
| The analyst | measured, cites numbers, no adjectives | LinkedIn |
| The coach | direct, second person, behavioural angle | X |

Voice consistency comes from a stored persona definition — vocabulary rules, sentence length band, forbidden phrases, worked examples — not from a one-line prompt. Stored in `persona`, versioned, so a voice change is deliberate.

## Sources

Posts are generated from objects that already exist. Nothing is written from scratch:

- A [[Findings]] object, fully anonymised → educational post
- A [[Market Analysis]] move explanation → market update
- An aggregate across users → *"traders who scale in after a loss lose 2.3x more"*

## Platform adaptation

Same source object, different renderer — identical to how the spine already renders four ways.

- **LinkedIn:** 3–5 short paragraphs, one concrete example, no hashtag spam
- **X:** single post under the limit, or a numbered thread where each item stands alone

## Anonymisation — hard gate

No account balances, no position sizes, no P&L figures, no dates precise enough to identify a user. Content generated from a user's finding must pass an automated scrub **and** a human review step before it can be marked publishable.

Implemented as a Trigger.dev waitpoint. Nothing auto-publishes, ever.

## Calendar

`content_post` holds status (`draft`, `approved`, `scheduled`, `published`), platform, scheduled time, and source object. The calendar is a view over that table, not a separate system.

## Compliance

Same constraints as everything else: no predictions, no signals, no profit claims. Public content carries more risk than private lessons, so the tone contract is enforced by an explicit checklist in the generation prompt, not by good intentions.
