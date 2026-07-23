---
tags: [feature, phase-3]
---

# F3 — Findings

A detection is mechanical: *these four deals, this rule fired*. A finding is the meaning.

One LLM call takes the detection plus market context and returns fixed JSON:

```json
{
  "market": "Gold spiked on the CPI release at 15:30; hourly range 3x normal",
  "action": "Stopped out, re-entered three times in 14 minutes at escalating size",
  "concept_code": "SIZING_AFTER_LOSS",
  "evidence_deal_ids": [40912, 40915, 40918, 40921],
  "severity_rationale": "Net -620 in 14 minutes, 3.4x median risk"
}
```

This object is the **join between the two original briefs** — the market half and the behavioural half meet here. Everything downstream renders from it.

## Determinism by caching

Keyed on a hash of (rule version, ordered deal ids, candle window). Same input, same finding, zero repeat cost. Stored in `llm_call`, fronted by Redis.

`concept_code` must resolve against the fixed taxonomy — reject and retry if it does not. See [[ADR-005 Fixed Concept Taxonomy]].

Full prompt contract in [[Finding Generation]].
