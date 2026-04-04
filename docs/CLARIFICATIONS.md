# Pending Clarifications

This file now tracks only active, unresolved questions that still require product-owner input or an external artifact.

## Current Status

- There are no open product clarifications blocking the repository at this time.
- Durable answers from the March-April 2026 clarification backlog were normalized into [DECISION_LOG.md](DECISION_LOG.md), especially the entries dated `2026-04-02`.
- Questions that were superseded by implemented repo changes were closed as overtaken by events and removed from the active backlog.

## Operational Follow-Up

- Replace the placeholder ROI calculator reference in [tools/roi/README.md](../tools/roi/README.md) once the public Google Sheets template URL is available.

### ❓ Question [2026-04-02] - ROI Google Sheets Template URL
**Context:** The ROI Auditor documentation and `tools/roi/README.md` both refer to a central Google Sheets ROI Calculator. Currently, there is a placeholder link in `tools/roi/README.md`.
**Ambiguity / Drift:** The project cannot deliver a verifiable "ROI modeling" capability without the specific template for the calculator.
**Question for Product Owner:** Is the public Google Sheets template URL available? If not, what is the ETA or should we provide a mock schema for now?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update tools/roi/README.md to replace "[Link Placeholder for ROI Calculator Template]" with the verified URL.*

### ❓ Question [2026-04-02] - `logging-mcp` Implementation Scope
**Context:** The requirements now define `logging-mcp` as a dual-backend protocol (Loki/Grafana and n8n webhooks).
**Ambiguity / Drift:** The protocol is currently documented in `mcp-protocols/logging-mcp.md` but is missing from `mcp.config.json` and does not have a reference implementation in `scripts/`.
**Question for Product Owner:** Should the `logging-mcp` be added to the default `mcp.config.json` immediately, or should it remain a reference documentation pattern until a specific runtime environment is ready?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update mcp.config.json to include "logging-mcp" in the active_mcps list and ensure context generators inject it correctly.*

## Template for New Questions

Add new questions below this line using the required format.

### ❓ Question [2026-04-02] - Node.js Resilience Helper Integration
**Context:** The `scripts/resilience_helpers.js` file exists and is mandated as a reference in `REQUIREMENTS.md`, but it is currently not utilized by the repository's core generation (`generate_all.js`) or audit tools (`audit-repo.js`).
**Ambiguity / Drift:** The core tools lack the exponential backoff resilience that the project mandates for agents.
**Question for Product Owner:** Should the `resilience_helpers.js` be integrated into the core repository scripts (`audit-repo.js`, `generate_all.js`) to satisfy the "Resilience" mandate within the repository's own tooling?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Refactor `scripts/audit-repo.js` and `scripts/generate_all.js` to use the `withRetry` helper for all filesystem operations.*

### ❓ Question [2026-04-02] - `logging-mcp` Activation Drift
**Context:** The `ROI Auditor` agent specification defines `logging-mcp` as a mandatory dependency for fleet-wide log ingestion, but the protocol is currently disabled (not present in `mcp.config.json`).
**Ambiguity / Drift:** The `ROI Auditor` cannot be fully validated as "active" in the current context files.
**Question for Product Owner:** Should `logging-mcp` be added to the default `active_mcps` list immediately to support Guardian agent development?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update `mcp.config.json` to include "logging-mcp" in the `active_mcps` list and regenerate context.*

### ❓ Question [2026-04-02] - Legacy Example Labeling
**Context:** `REQUIREMENTS.md` Section 8 requires historical Python examples to be "clearly labeled as illustrative or legacy," but several examples (e.g., `examples/docker/`, `examples/video-automation-pod/`) lack these explicit headers.
**Ambiguity / Drift:** New builders may mistake legacy Python patterns for the canonical implementation path.
**Question for Product Owner:** Should Jules proceed with a bulk update to prepend "LEGACY/ILLUSTRATIVE" headers to all Python and Bash examples?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update all `.py` and `.sh` files in the `examples/` directory to include the mandatory "LEGACY/ILLUSTRATIVE" header.*

```md
### ❓ Question [YYYY-MM-DD] - Short Title
**Context:** Why this question exists and what file, workflow, or contract it relates to.
**Ambiguity / Drift:** What is unclear, contradictory, or externally blocked.
**Question for Product Owner:** The specific decision that still needs to be made.
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Optional implementation prompt once the answer is known.*
```

