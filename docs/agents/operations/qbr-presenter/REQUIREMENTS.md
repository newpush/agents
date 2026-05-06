# QBR Presenter Agent — Initial Requirements

## Summary

An operations agent that automates the preparation and assembly of Quarterly Business Reviews for MSP clients. It replaces the manual effort of pulling metrics from multiple systems, building slide decks, writing executive narratives, and tracking action item continuity — reducing QBR prep from days to under an hour.

## Problem Statement

QBR preparation at an MSP is labor-intensive and inconsistent:

- **Data is scattered** across PSA (tickets, SLAs), RMM (uptime, patches, assets), security consoles, and project trackers. Gathering it manually takes hours per client.
- **Narrative quality varies** by account manager. Some QBRs are data-heavy with no story; others are vague with no supporting numbers.
- **Action item continuity breaks** when items from the previous QBR are forgotten or not tracked systematically.
- **Deck formatting is inconsistent** across clients and presenters, undermining brand perception.
- **Strategic recommendations are reactive** — surfacing only what the client already knows rather than proactively identifying risks and opportunities from the data.

As the client portfolio grows, QBR quality degrades because the prep effort doesn't scale linearly with headcount.

## Functional Requirements

### FR-1: Data Aggregation

The agent must collect metrics from the following operational domains for a specified quarter:

| Domain | Metrics | Typical Source |
|--------|---------|----------------|
| Service Desk | Ticket volume, categories, priorities, MTTR, SLA compliance, CSAT | PSA (ConnectWise, Autotask, HaloPSA) |
| Infrastructure | Uptime %, planned/unplanned downtime, backup success rate, capacity trends | RMM (Datto, NinjaOne, Automate) |
| Security | Patch compliance, endpoint coverage, incidents, MFA adoption, vulnerability counts | EDR console, patch manager, email gateway |
| Assets | Managed endpoints, new/decommissioned devices, license utilization, EOL hardware | RMM + license portal |
| Projects | Active/completed/upcoming projects, milestones, blockers | PSA or project tracker |

If a data source is unavailable, the agent must explicitly note the gap in the report rather than silently omitting the section.

### FR-2: Trend Analysis

Every metric must be presented with at least one prior quarter for comparison. The agent must:

- Calculate percentage change quarter-over-quarter.
- Assign a directional indicator: `improving`, `stable`, or `declining`.
- Highlight metrics that crossed a threshold (e.g., SLA compliance dropped below contracted target).

### FR-3: Action Item Continuity

The agent must:

- Load action items from the previous QBR (stored in `clients/{client-id}/qbr/`).
- Cross-reference each item against current system state to determine status.
- Classify each as `COMPLETED`, `IN_PROGRESS`, `OVERDUE`, or `DEFERRED`.
- Carry over incomplete items into the new QBR's proposed action list.

### FR-4: Risk & Recommendation Engine

The agent must identify and classify risks from the data:

- Hardware approaching end-of-life with no replacement plan.
- Declining trend lines (patch compliance, SLA, uptime).
- Rising ticket volume in a specific category (indicates systemic issue).
- Security gaps (low MFA adoption, missed training, unpatched criticals).
- Overdue action items from prior QBRs.

Each risk must be classified (Low / Medium / High) and paired with a prioritized recommendation categorized as `quick_win`, `strategic`, or `risk_mitigation`.

### FR-5: Presentation Generation

The agent must produce a Google Slides deck following a standard structure:

1. Title slide (client branding, period, date)
2. Agenda
3. Executive Summary (narrative, not bullets of numbers)
4. Previous Action Items (status table)
5. Service Desk Overview (charts + SLA gauge)
6. Top Issues (recurring patterns)
7. Infrastructure & Uptime (availability scorecard)
8. Security Posture (compliance dashboard)
9. Asset Inventory (changes + EOL alerts)
10. Projects & Initiatives
11. Strategic Recommendations (prioritized)
12. Proposed Action Items (with owners and deadlines)
13. Q&A / Discussion

The deck must use the client's branded template if one exists in Google Drive.

### FR-6: Supporting Deliverables

In addition to the slide deck, the agent must produce:

- **Executive summary email** — Gmail draft addressed to the client contact with a concise quarter summary and QBR meeting details.
- **Internal prep notes** — Talking points, anticipated questions, and upsell opportunities for the MSP presenter.

### FR-7: Human-in-the-Loop

All deliverables must be generated as drafts for human review. The agent must never send the QBR deck or email to a client without explicit human approval.

## Non-Functional Requirements

- **Data integrity:** All metrics must trace to a named data source. No interpolation or fabrication of missing data.
- **Balanced framing:** Presentation must include both wins and improvement areas. Exclusively positive or negative framing is rejected.
- **Client-specific tailoring:** Recommendations must account for the client's industry, size, risk tolerance, and contract tier.
- **Secrets:** The agent never handles raw API keys or credentials — all data source access uses vault-injected credentials at runtime.
- **Performance:** Full QBR generation (data pull through deck creation) should complete within 15 minutes per client for standard data volumes.

## Agent Spec Outline

The agent spec (`agents/operations/qbr-presenter.md`) should follow `docs/AGENT_TEMPLATE.md` with:

- **Role:** MSP Quarterly Business Review Specialist
- **Tone:** Executive-appropriate, data-driven, consultative
- **Capabilities:** Data aggregation, trend analysis, risk identification, deck generation, action item tracking
- **Rules & Constraints (4D Diligence):**
  1. Data before narrative — never write commentary without validated metrics
  2. Quarter-over-quarter context required for every metric
  3. Business language — translate technical metrics to impact
  4. Balanced reporting — include wins and improvement areas
  5. Action item continuity — always review previous QBR items
  6. No fabrication — explicitly state data gaps
- **Boundaries:**
  - Always: Include prior-quarter comparisons, review previous action items, cite data sources, generate as draft
  - Ask First: Sending to client, including financials, recommending tier changes
  - Never: Fabricate data, send without human review, expose internal pricing, include raw vulnerability details

## Dependencies

- PSA / Ticketing API for service desk metrics
- RMM API for infrastructure and asset data
- Security tool APIs (EDR, patch management, email gateway)
- Google Workspace MCPs (Slides, Drive, Gmail, Sheets)
- Fleet Dashboard API for QBR completion tracking
- Slack MCP for notifications
- Vault CLI (`op` / `infisical`) for credential injection

## Open Questions

1. Should QBR data be cached in a local datastore (e.g., a per-client SQLite DB) to enable historical analysis beyond what the source APIs retain?
2. What is the minimum set of data sources for a viable QBR? (e.g., if the client has no RMM data, can the agent still produce a service-desk-only review?)
3. Should the branded slide template be stored in the NoéMI repo or fetched from the client's Google Drive folder each time?
4. How should financial data (contract value, utilization, overages) be handled — separate data source, or manually provided during intake?
5. Should the agent support ad-hoc "Monthly Business Review" or "Annual Review" variants, or should those be separate agent specs?
