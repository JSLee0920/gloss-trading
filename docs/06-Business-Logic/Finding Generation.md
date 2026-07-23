---
tags: [logic]
---

# Finding Generation

One LLM call per detection. Runs as `generate-finding` on Trigger.dev, fanned out with `batchTrigger` from `DetectionCreated`.

## Input assembled by Java, not the model

- The detection: rule, severity, window, realised cost
- The evidence deals: full rows
- The candle window: anchor ± N bars at the appropriate timeframe
- Market context: volatility versus trailing average, session, scheduled events in window
- The trader's baseline: median volume, typical risk, usual hold time
- The allowed concept codes for this asset class

The model interprets. It never decides *what happened*.

## Output contract

Strict JSON. Reject and retry on schema violation or unknown `concept_code`.

```json
{
  "market": "string, one sentence, factual",
  "action": "string, one sentence, no judgement language",
  "concept_code": "must exist in taxonomy",
  "evidence_deal_ids": [1, 2, 3],
  "severity_rationale": "string, must cite a number"
}
```

## Tone rules baked into the prompt

- No second-person accusation. "Three entries followed the loss," not "you panicked."
- No prediction, no advice on what to do next. See [[Non-Goals]].
- Every claim must cite a number present in the input.

## Caching

`prompt_hash` = hash of (rule code, rule version, ordered deal ids, candle window bounds, prompt template version). Stored in `llm_call`, fronted by Redis.

Bumping the prompt template version invalidates cleanly and lets you re-render history deliberately rather than by accident.

## Market context agent

When the detection window contains an unexplained move, `market-context-agent` runs first: news search, economic calendar, candle inspection. Its output becomes the `market` field's source material. This is the one genuinely agentic step in the path.
