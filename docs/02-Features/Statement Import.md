---
tags: [feature, phase-1]
---

# F1 — Statement Import

The onboarding path and the only data entry point. Everything else is downstream of this working well.

## Accepted formats

- MT4 / MT5 HTML report (jsoup)
- MT5 XLSX export (Apache POI)
- Generic CSV with a column mapper (OpenCSV)

## Why an agent belongs here

Broker statements are inconsistent: unknown column names, four date formats, differing P&L and commission conventions, sometimes a header row buried three rows down. An import agent inspects the first N rows, proposes a column mapping, and is validated against parsed output. That beats hand-writing twenty parsers.

The agent proposes; deterministic Java code parses. If the mapping fails validation, the user corrects it in the UI and the corrected mapping is stored on `import_batch` for reuse.

## Deal level, not position level

The broker records **deals** — individual fills. A single position may be four deals: open 0.5 lots, add 0.5, close 0.3, close 0.7.

Store every deal. Reconstruct positions on top. If you only store "opened at X, closed at Y, P&L Z" you have deleted the scale-in — and scaling in after a loss is precisely the behaviour [[Detection Engine]] exists to find.

## Deduplication

Natural key: `(account_id, external_deal_id)`. Re-uploading an overlapping statement must be a no-op. Users will do this constantly.

## Output

- `import_batch` row with status and stored column mapping
- N `deal` rows
- M reconstructed `position` rows
- `TradesImported` event → triggers candle backfill and a detection run

See [[Import Pipeline]] for the full step sequence.
