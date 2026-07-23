---
tags: [tech]
---

# Data Sources

All free. No broker API dependency — see [[ADR-004 No Broker API]].

## Trade history

| Source | Use | Notes |
|---|---|---|
| Statement import | **primary** | MT4/MT5 HTML, XLSX, generic CSV. Universal, no keys, no OAuth. |
| MetaTrader5 Python package | Phase 5 live | talks to a local MT5 terminal; `history_deals_get()`, `copy_rates_range()`. Windows-only officially. Runs inside a Trigger.dev task via build extensions. |
| Alpaca paper trading | dev/testing | free keys, real fill history |
| Binance testnet | dev/testing | free, full order history, crypto |

## Market data (candles)

| Source | Coverage | Notes |
|---|---|---|
| Binance public REST | crypto | no key, 1m klines years deep. Best free intraday source that exists. |
| Dukascopy historical | FX, metals | free tick/candle archive. `.bi5` format — load offline as a batch job, not at runtime. |
| yfinance | equities, indices, futures | no key; good for daily and short-window intraday |

Put all three behind one `CandleSource` interface on day one. You will swap them.

## News

GDELT (free, no key) plus broker and market RSS feeds. Enough for "what happened around this trade."

## LLM

Gemini free tier as the default, Groq for cheap high-volume renderer calls. Behind an interface — assume you will change provider.

> Verify current free-tier limits before depending on any keyed service. Those numbers move.
