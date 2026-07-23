---
tags: [adr]
status: accepted
---

# ADR-004 — Statement import, not broker APIs

## Context

The original idea assumed a specific broker's API for trade history and market data. That was dropped.

## Decision

Statement file import is the primary and universal ingestion path. Free public sources supply market data. No broker API dependency, no OAuth.

## Rationale

- **Broker-agnostic is a better product.** Anyone with an export file can onboard.
- **Lowest possible onboarding friction.** Drag in a file, get analysis. No account linking, no permissions screen, no waiting on API approval.
- **No vendor lock.** The product is not hostage to one broker's terms or rate limits.
- Market data is available free at sufficient quality: Binance for crypto, Dukascopy for FX and metals, yfinance for equities. See [[Data Sources]].

## Consequences

- Must parse several statement formats. Mitigated by the import agent handling column mapping. See [[Statement Import]].
- No real-time data until Phase 5, which needs a local MetaTrader terminal connection. Acceptable — everything through Phase 4 works on history.
- Free tiers change. Every source sits behind a `CandleSource` interface so providers can be swapped.
