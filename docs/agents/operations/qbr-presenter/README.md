# QBR Presenter — Setup & Operations Guide

## Overview

The QBR Presenter agent automates Quarterly Business Review preparation for MSP clients. It pulls operational data from ticketing, monitoring, and security systems, analyzes trends, generates a branded slide deck, drafts the client email, and produces internal presenter prep notes.

The agent generates everything as **drafts for human review** — it never sends materials to a client autonomously.

---

## Architecture

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PSA / Tickets│  │ RMM / Monitor│  │ Security     │  │ Previous QBR │
│ (ConnectWise,│  │ (Datto,      │  │ (EDR, Patch, │  │ Action Items │
│  Autotask)   │  │  NinjaOne)   │  │  Email GW)   │  │              │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │                 │
       ▼                 ▼                 ▼                 ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        QBR Presenter Agent                          │
│                                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐ │
│  │ INTAKE  │→ │ GATHER  │→ │ ANALYZE │→ │ BUILD   │→ │ REVIEW   │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └──────────┘ │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     ┌──────────────┐ ┌─────────┐ ┌───────────┐
     │ Google Slides│ │ Gmail   │ │ Prep Notes│
     │ (QBR Deck)   │ │ (Draft) │ │ (Markdown)│
     └──────────────┘ └─────────┘ └───────────┘
```

---

## Prerequisites

### Required MCP Integrations

| MCP | Purpose | Config Key |
|-----|---------|------------|
| Google Slides | Deck generation | `google-slides` |
| Google Drive | Template retrieval, deck storage | `google-drive` |
| Gmail | Executive summary email draft | `gmail` |
| Slack | Completion notifications | `slack` |

### Optional MCP Integrations

| MCP | Purpose |
|-----|---------|
| Google Sheets | KPI tracking spreadsheets |
| Google Calendar | QBR meeting scheduling |

### Data Source Access

The agent needs read access to your operational platforms. Configure API credentials in your vault:

```bash
# Example: ConnectWise PSA credentials
op item create --category=login --title="ConnectWise API" \
  --field="company_id=mycompany" \
  --field="public_key=<key>" \
  --field="private_key=<key>" \
  --field="site=na.myconnectwise.net"

# Example: Datto RMM credentials
op item create --category=login --title="Datto RMM API" \
  --field="api_url=https://pinotage-api.centrastage.net" \
  --field="api_key=<key>" \
  --field="api_secret=<secret>"
```

---

## Client Setup

### 1. Client Folder Structure

Each client needs a QBR directory for storing historical data and action items:

```
clients/{client-id}/
├── mcp.config.json          # Client MCP config (from onboarding)
├── profile.yml              # Client metadata
└── qbr/
    ├── templates/
    │   └── slide-template-id.txt   # Google Slides template ID
    ├── 2025-Q4/
    │   ├── deck.pdf
    │   ├── prep-notes.md
    │   └── action-items.yml
    └── 2026-Q1/
        ├── deck.pdf
        ├── prep-notes.md
        └── action-items.yml
```

### 2. Client Profile

Create `clients/{client-id}/profile.yml` with client metadata:

```yaml
client_id: acme-corp
display_name: "ACME Corporation"
industry: "Manufacturing"
tier: "Premium"
size: "150 employees"
contacts:
  primary:
    name: "Jane Smith"
    email: "jane.smith@acme-corp.com"
    role: "IT Director"
  executive:
    name: "Bob Johnson"
    email: "bob.johnson@acme-corp.com"
    role: "CFO"
qbr:
  frequency: "quarterly"
  presenter: "Alex Martinez"
  slide_template_id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
  branded_colors:
    primary: "#1B365D"
    accent: "#E87722"
  focus_areas:
    - "security"
    - "cloud_migration"
  custom_kpis:
    - name: "ERP Uptime"
      target: "99.9%"
      source: "rrmm_monitor_id_1234"
data_sources:
  psa: "connectwise"
  rmm: "datto"
  security:
    edr: "sentinelone"
    email: "proofpoint"
    patch: "datto"
```

### 3. Branded Slide Template

Create a Google Slides template with the client's branding and the following placeholder slides. The agent populates content into this template.

**Template setup:**
1. Create a new Google Slides presentation with the client's logo, colors, and font choices.
2. Add 13 placeholder slides matching the deck structure in the agent spec.
3. Note the presentation ID from the URL (the long string between `/d/` and `/edit`).
4. Store the ID in `clients/{client-id}/qbr/templates/slide-template-id.txt`.

---

## Running a QBR

### Manual Invocation

Trigger QBR preparation by providing the required parameters:

```
Prepare the Q1 2026 QBR for client acme-corp.
QBR date: April 15, 2026.
Presenter: Alex Martinez.
Focus areas: security deep-dive, cloud migration progress.
```

The agent will:
1. Load the client profile and previous QBR action items.
2. Pull metrics from all configured data sources.
3. Analyze trends and identify risks.
4. Generate the slide deck, email draft, and prep notes.
5. Present everything for your review.

### Scheduled Invocation

Set up a recurring trigger to begin QBR prep automatically at the start of each quarter:

```yaml
# In your orchestrator schedule config
qbr_prep:
  schedule: "0 9 1 1,4,7,10 *"  # 9 AM on the 1st of Jan, Apr, Jul, Oct
  agent: "qbr-presenter"
  params:
    client_ids: ["acme-corp", "globex", "initech"]
    quarter: "auto"  # Derives from current date
```

---

## Workflow Detail

### Phase 1: INTAKE

The agent validates inputs and loads context:

```yaml
# Validated intake payload
intake:
  client_id: "acme-corp"
  period: "Q1 2026"
  quarter_start: "2026-01-01"
  quarter_end: "2026-03-31"
  qbr_date: "2026-04-15"
  presenter: "Alex Martinez"
  focus_areas: ["security", "cloud_migration"]
  previous_qbr: "clients/acme-corp/qbr/2025-Q4/action-items.yml"
  template_id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
```

### Phase 2: GATHER

Data collection from each source. The agent handles API pagination, rate limiting, and timeout gracefully.

**Example: Service desk query**
```
Tickets created between 2026-01-01 and 2026-03-31 for company "ACME Corporation"
→ Group by: category, priority, month
→ Calculate: count, MTTR, SLA compliance rate
```

**Data gap handling:** If a source is unavailable, the agent logs the gap and continues:
```yaml
data_gaps:
  - source: "SentinelOne API"
    reason: "API returned 401 — credential may need rotation"
    impact: "Security incident counts and endpoint coverage unavailable"
    recommendation: "Check vault entry op://MSP-Clients/acme-corp/sentinelone-api-key"
```

### Phase 3: ANALYZE

The agent computes trends and generates insights:

```yaml
# Example trend analysis output
trends:
  tickets:
    current_quarter: 342
    previous_quarter: 389
    change: "-12.1%"
    direction: "improving"
    insight: "Ticket volume decreased 12% QoQ, driven by resolution of recurring printer issues identified in the Q4 QBR."

  sla_compliance:
    current_quarter: "96.2%"
    previous_quarter: "94.8%"
    target: "95%"
    change: "+1.4pp"
    direction: "improving"
    insight: "SLA compliance exceeded the 95% target for the first time in 3 quarters."

  patch_compliance:
    current_quarter: "91%"
    previous_quarter: "95%"
    target: "95%"
    change: "-4pp"
    direction: "declining"
    insight: "Patch compliance dropped below the 95% target. Root cause: 14 servers deferred March patches due to ERP maintenance window."
```

**Risk identification output:**
```yaml
risks:
  - item: "3 servers running Windows Server 2019 reach end of extended support in Jan 2027"
    tier: "MEDIUM"
    category: "risk_mitigation"
    recommendation: "Begin migration planning this quarter. Estimated effort: 2-3 days per server."

  - item: "Patch compliance dropped to 91%, below the 95% contractual target"
    tier: "HIGH"
    category: "quick_win"
    recommendation: "Schedule a catch-up patching window in April to address the 14 deferred servers."

  - item: "MFA adoption stalled at 88% — 18 users without MFA are in the finance department"
    tier: "HIGH"
    category: "risk_mitigation"
    recommendation: "Enforce MFA for all finance users by end of Q2. Coordinate with client IT Director."
```

### Phase 4: BUILD

The agent generates three deliverables:

**Slide deck** — Populated into the branded Google Slides template. Each slide includes:
- A headline that tells the story (not just the metric name)
- Supporting data visualization description (charts are described for Slides API rendering)
- Context footnotes citing the data source

**Example slide 3 — Executive Summary:**
> **A Strong Quarter with One Area Requiring Attention**
>
> - Ticket volume dropped 12% as recurring printer issues from Q4 were permanently resolved
> - SLA compliance exceeded the 95% target for the first time in three quarters (96.2%)
> - Cloud migration Phase 1 completed on schedule — 40 users now on Azure AD
> - **Action needed:** Patch compliance dipped to 91% due to deferred March maintenance; catch-up window recommended for April

**Email draft** — Concise, executive-appropriate:
> Subject: ACME Corporation — Q1 2026 Quarterly Business Review
>
> Hi Jane,
>
> Attached is the Q1 2026 Quarterly Business Review for ACME Corporation. Here are the highlights:
>
> - Ticket volume decreased 12% quarter-over-quarter, and SLA compliance exceeded the 95% target at 96.2%.
> - Cloud migration Phase 1 completed on schedule with 40 users transitioned to Azure AD.
> - One item requires attention: patch compliance dropped to 91%, and we're recommending a catch-up window in April.
>
> Our QBR meeting is scheduled for April 15 at 2:00 PM CT. Please let me know if you'd like to adjust the agenda or add any topics.
>
> Best regards,
> Alex Martinez

**Prep notes** — Internal-only document:
```markdown
## Talking Points

### Slide 5: Service Desk Overview
- Lead with the 12% volume reduction — this validates the printer fleet replacement we recommended last quarter
- MTTR improved from 4.2h to 2.8h — tie this to the new triage process we implemented in February
- If asked about the 14 unresolved tickets: 8 are waiting on vendor parts (ETA next week), 6 are low-priority requests in backlog

### Slide 8: Security Posture
- Patch compliance drop is likely to generate questions
- Frame proactively: "We identified this trend mid-quarter and have already scheduled the catch-up window"
- MFA gap in finance is a sensitive topic — present as a risk, not a criticism of their team

### Upsell Opportunities
- Client has expressed interest in SOC monitoring — the 47 blocked threats this quarter support the value proposition
- Windows Server 2019 EOL creates a natural conversation about infrastructure refresh
```

### Phase 5: REVIEW

The agent presents all deliverables and flags items needing attention:

```yaml
review_checklist:
  - item: "Slide deck generated"
    status: "ready"
    url: "https://docs.google.com/presentation/d/..."

  - item: "Email draft created"
    status: "ready"
    draft_id: "r1234567890"

  - item: "Prep notes generated"
    status: "ready"
    path: "clients/acme-corp/qbr/2026-Q1/prep-notes.md"

  - item: "SentinelOne data missing"
    status: "warning"
    note: "Security incident counts estimated from email gateway logs only. Verify with SentinelOne console manually."

  - item: "CSAT data not available"
    status: "gap"
    note: "No CSAT survey configured for this client. Slide 5 omits satisfaction scores."
```

### Phase 6: DELIVER

After human approval, the agent:
1. Exports the deck as PDF to `clients/acme-corp/qbr/2026-Q1/deck.pdf`.
2. Sends the email with PDF attached.
3. Saves the new action items to `clients/acme-corp/qbr/2026-Q1/action-items.yml`.
4. Posts a completion summary to the Slack ops channel.
5. Reports completion to the Fleet Dashboard.

---

## Action Item Format

Action items are stored as YAML for cross-quarter continuity:

```yaml
# clients/acme-corp/qbr/2026-Q1/action-items.yml
qbr_period: "Q1 2026"
qbr_date: "2026-04-15"
items:
  # Carried from previous QBR
  - id: "2025Q4-003"
    description: "Complete MFA rollout for finance department"
    owner: "Jane Smith (ACME) + Alex Martinez (MSP)"
    deadline: "2026-06-30"
    priority: "high"
    status: "in_progress"
    notes: "18 of 24 finance users enrolled. Remaining 6 scheduled for May."
    carried_from: "Q4 2025"

  # New items from this QBR
  - id: "2026Q1-001"
    description: "Schedule catch-up patching window for 14 deferred servers"
    owner: "Alex Martinez (MSP)"
    deadline: "2026-04-30"
    priority: "high"
    status: "new"

  - id: "2026Q1-002"
    description: "Begin Windows Server 2019 migration planning (3 servers)"
    owner: "Alex Martinez (MSP)"
    deadline: "2026-06-30"
    priority: "medium"
    status: "new"

  - id: "2026Q1-003"
    description: "Evaluate SOC monitoring proposals and present options at next QBR"
    owner: "Alex Martinez (MSP)"
    deadline: "2026-07-01"
    priority: "low"
    status: "new"
```

---

## KPI Reference

Standard KPIs tracked across QBRs. Clients may add custom KPIs in their profile.

| Category | KPI | Target (Typical) | Source |
|----------|-----|-------------------|--------|
| Service Desk | Ticket Volume | Trending down | PSA |
| Service Desk | MTTR | < 4 hours | PSA |
| Service Desk | SLA Compliance | > 95% | PSA |
| Service Desk | CSAT | > 4.5 / 5.0 | PSA survey |
| Infrastructure | Uptime | > 99.9% | RMM |
| Infrastructure | Backup Success Rate | 100% | RMM / BDR |
| Infrastructure | Last Verified Restore | < 30 days | Manual / RMM |
| Security | Patch Compliance | > 95% | RMM / Patch Manager |
| Security | Endpoint Protection Coverage | 100% | EDR |
| Security | MFA Adoption | 100% | IdP / Azure AD |
| Security | Security Incidents | Trending down | EDR + Email GW |
| Assets | Managed Endpoints | Per contract | RMM |
| Assets | License Utilization | < 100% | License portal |
| Assets | EOL Hardware | 0 critical | RMM asset DB |

---

## Troubleshooting

### "Data gap" for a metric source

The agent couldn't reach a data source API. Check:
1. Vault credentials are current: `op read "op://MSP-Clients/{client-id}/{source}-api-key"`
2. API endpoint is reachable from the agent's network
3. Rate limits haven't been hit (check the agent's stderr logs)

### Slide deck uses wrong template

Verify the template ID in `clients/{client-id}/qbr/templates/slide-template-id.txt` matches the Google Slides URL. The ID is the string between `/d/` and `/edit` in the URL.

### Action items not carried from previous QBR

The agent looks for `clients/{client-id}/qbr/{previous-quarter}/action-items.yml`. If the file doesn't exist or the path doesn't match the expected quarter label, items won't carry over. Check:
- The previous quarter's directory exists
- The `action-items.yml` file is properly formatted
- Quarter labels use the format `YYYY-QN` (e.g., `2025-Q4`)

### Email draft not appearing in Gmail

Ensure the Gmail MCP is authenticated and the `gmail` integration is active in the client's MCP config. The agent creates drafts via the Gmail API — check the Drafts folder, not the Inbox.
