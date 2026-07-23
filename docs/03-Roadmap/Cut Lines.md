---
tags: [roadmap]
---

# Cut Lines

Where to stop when the scope creeps. Written down so future-me cannot negotiate.

## Infrastructure is introduced when it is needed, not before

| Component | Earliest phase | Trigger for adding it |
|---|---|---|
| Redis | 3 | LLM calls start costing money |
| Trigger.dev | 3 | An import takes longer than an HTTP request should |
| Kafka | 4 | `DetectionCreated` has a second consumer |
| Python sidecar | 5 | Live MT5 connection needed |

Standing all of it up before there is a working import costs weeks of docker-compose and produces no product.

## Hard cuts until the phase that owns them

- Personas and social content — Phase 6
- Multi-broker OAuth — never, statement import covers it
- Real-time anything — Phase 5
- Mobile — after retention exists
- More than one asset class fully wired — after forex works end to end

## The retention test

If a user does not come back after their first import, no amount of Phase 5 or 6 fixes it. Every scope decision resolves toward making the Phase 1–4 loop better rather than adding a phase.
