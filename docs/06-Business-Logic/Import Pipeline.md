---
tags: [logic]
---

# Import Pipeline

Runs as the `import-statement` Trigger.dev task from Phase 3; a plain synchronous Spring service in Phases 1–2.

## Steps

1. **Store file**, create `import_batch` with status `received`
2. **Sniff format** — HTML, XLSX, or CSV
3. **Propose column mapping** — the import agent reads the first ~30 rows and returns a mapping. Deterministic parsers do the actual parsing.
4. **Validate mapping** — parse 10 rows, assert types, date parseability, and that P&L sums are plausible. On failure, surface the mapping to the user for correction.
5. **Persist mapping** on `import_batch` for reuse on the next upload from the same broker
6. **Parse all rows** → `deal`, deduping on `(account_id, external_deal_id)`
7. **Resolve instruments** — map broker symbol strings to `instrument`. Unknown symbols create a row flagged for review, they never block the import.
8. **Reconstruct positions** — FIFO over deals per instrument, producing `position`
9. **Emit `TradesImported`** via the outbox
10. **Backfill candles** for every (instrument, date range) touched — see [[Data Sources]]
11. **Emit `CandleBatchLoaded`** → recompute `max_adverse` / `max_favorable`, run detection

## Idempotency

Re-running the whole pipeline on the same file must change nothing. Guaranteed by the deal natural key, `detection.dedupe_hash`, and a Redis `SETNX` on `import_batch` id. Assume every step will re-execute — Trigger.dev retries replay steps.

## Progress

Each step publishes progress to the Trigger.dev realtime stream. The upload screen shows the actual step, not a spinner. This is the first 60 seconds of the product and it should feel like work is happening.
