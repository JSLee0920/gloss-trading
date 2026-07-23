---
tags: [data]
---

# ERD

Column details and indexing notes in [[Table Reference]].

```mermaid
erDiagram
    app_user ||--o{ account : owns
    app_user ||--o{ concept_mastery : has
    app_user ||--|| learner_profile : configured_by
    app_user ||--o{ assessment : completed
    app_user ||--o{ watchlist : follows
    app_user ||--o{ market_brief : receives
    instrument ||--o{ watchlist : listed_in
    persona ||--o{ content_post : written_as
    finding ||--o{ content_post : sourced_from
    account ||--o{ import_batch : uploads
    account ||--o{ deal : contains
    account ||--o{ position : contains
    import_batch ||--o{ deal : produced
    instrument ||--o{ deal : on
    instrument ||--o{ position : on
    instrument ||--o{ candle : has
    position ||--o{ deal : reconstructed_from
    account ||--o{ detection : flagged_on
    rule ||--o{ detection : fired
    rule ||--o{ rule_profile : tuned_by
    detection ||--o{ detection_deal : evidences
    deal ||--o{ detection_deal : cited_in
    detection ||--|| finding : explained_by
    concept ||--o{ finding : about
    concept ||--o{ concept_mastery : tracked_by
    concept ||--o{ concept : prerequisite_of
    finding ||--o{ lesson : taught_as
    finding ||--o| comparison : contrasted_by
    position ||--o{ comparison : contrast_case
    lesson ||--o{ lesson_response : answered_by
    detection ||--o{ nudge : delivered_as
    app_user ||--o{ nudge : receives

    app_user {
        uuid id PK
        text email UK
        text display_name
        timestamptz created_at
    }
    account {
        uuid id PK
        uuid user_id FK
        text broker
        text account_ref_hash
        char base_currency
        text source_type
        timestamptz created_at
    }
    instrument {
        uuid id PK
        text symbol UK
        text asset_class
        char quote_currency
        numeric contract_size
        numeric tick_size
        text session_calendar
        text data_source
    }
    import_batch {
        uuid id PK
        uuid account_id FK
        text filename
        text format
        int row_count
        text status
        jsonb column_mapping
        timestamptz created_at
    }
    deal {
        bigint id PK
        uuid account_id FK
        uuid instrument_id FK
        uuid import_batch_id FK
        uuid position_id FK
        text external_deal_id
        text side
        numeric volume
        numeric price
        numeric commission
        numeric swap
        numeric profit
        text entry_type
        timestamptz executed_at
    }
    position {
        bigint id PK
        uuid account_id FK
        uuid instrument_id FK
        numeric net_volume
        numeric avg_entry
        numeric avg_exit
        numeric realized_pnl
        numeric max_adverse
        numeric max_favorable
        timestamptz opened_at
        timestamptz closed_at
    }
    candle {
        uuid instrument_id PK
        text timeframe PK
        timestamptz ts PK
        numeric open
        numeric high
        numeric low
        numeric close
        numeric volume
    }
    rule {
        uuid id PK
        text code UK
        text name
        text kind
        jsonb definition
        text status
        text source
        int version
        timestamptz approved_at
    }
    rule_profile {
        uuid id PK
        uuid rule_id FK
        text asset_class
        jsonb params
    }
    detection {
        bigint id PK
        uuid account_id FK
        uuid rule_id FK
        int rule_version
        text polarity
        text severity
        numeric realized_cost
        timestamptz window_start
        timestamptz window_end
        text dedupe_hash UK
        timestamptz created_at
    }
    detection_deal {
        bigint detection_id FK
        bigint deal_id FK
    }
    finding {
        uuid id PK
        bigint detection_id FK
        uuid concept_id FK
        jsonb market_context
        text action_summary
        text severity_rationale
        text prompt_hash UK
        text model
        timestamptz created_at
    }
    comparison {
        uuid id PK
        uuid finding_id FK
        bigint contrast_position_id FK
        numeric similarity
        text rationale
    }
    concept {
        uuid id PK
        text code UK
        text name
        text asset_class
        text description
        uuid prerequisite_id FK
    }
    concept_mastery {
        uuid id PK
        uuid user_id FK
        uuid concept_id FK
        text state
        text confidence_source
        int occurrence_count
        int clean_opportunities
        timestamptz last_regression_at
        timestamptz promoted_at
        timestamptz updated_at
    }
    lesson {
        uuid id PK
        uuid finding_id FK
        uuid user_id FK
        timestamptz replay_anchor_ts
        text prompt_text
        text status
        timestamptz created_at
    }
    lesson_response {
        uuid id PK
        uuid lesson_id FK
        text user_answer
        timestamptz revealed_at
        timestamptz created_at
    }
    nudge {
        uuid id PK
        uuid user_id FK
        bigint detection_id FK
        text channel
        text cooldown_key
        timestamptz delivered_at
    }
    llm_call {
        uuid id PK
        text prompt_hash UK
        text purpose
        text model
        int input_tokens
        int output_tokens
        numeric cost
        jsonb response
        timestamptz created_at
    }
    learner_profile {
        uuid user_id PK
        text lead_with
        text depth
        text formality
        text numbers
        jsonb goals
        int version
        timestamptz updated_at
    }
    assessment {
        uuid id PK
        uuid user_id FK
        jsonb declared_answers
        jsonb inferred_seed
        timestamptz created_at
    }
    watchlist {
        uuid id PK
        uuid user_id FK
        uuid instrument_id FK
        timestamptz added_at
    }
    market_brief {
        uuid id PK
        uuid user_id FK
        text period
        jsonb content
        timestamptz generated_at
    }
    persona {
        uuid id PK
        text name
        text platform
        jsonb voice_definition
        int version
    }
    content_post {
        uuid id PK
        uuid persona_id FK
        uuid finding_id FK
        text platform
        text status
        text body
        timestamptz scheduled_for
        timestamptz published_at
        timestamptz approved_at
    }
    outbox {
        bigint id PK
        text aggregate_type
        text aggregate_id
        text event_type
        jsonb payload
        timestamptz created_at
        timestamptz published_at
    }
```

`llm_call` and `outbox` are infrastructure tables with no foreign keys into the domain — deliberately, so they can be truncated or replayed independently.
