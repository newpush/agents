# Pending Clarifications

This file now tracks only active, unresolved questions that still require product-owner input or an external artifact.

## Current Status

- There are no open product clarifications blocking the repository at this time.
- Durable answers from the March-April 2026 clarification backlog were normalized into [DECISION_LOG.md](DECISION_LOG.md), especially the entries dated `2026-04-02`.
- Questions that were superseded by implemented repo changes were closed as overtaken by events and removed from the active backlog.

## Operational Follow-Up

- Replace the placeholder ROI calculator reference in [tools/roi/README.md](../tools/roi/README.md) once the public Google Sheets template URL is available.

## Template for New Questions

Add new questions below this line using the required format.

```md
### ❓ Question [YYYY-MM-DD] - Short Title
**Context:** Why this question exists and what file, workflow, or contract it relates to.
**Ambiguity / Drift:** What is unclear, contradictory, or externally blocked.
**Question for Product Owner:** The specific decision that still needs to be made.
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Optional implementation prompt once the answer is known.*
```

### ❓ Question [2026-04-02] - Reference Implementation for Exponential Backoff
**Context:** The `AGENTS.md` and `REQUIREMENTS.md` both mandate "Exponential Backoff" as a core resilience pattern, and `scripts/retry-with-backoff.sh` exists as a shell utility.
**Ambiguity / Drift:** There is no corresponding Node.js or Python reference implementation (e.g., a shared helper or decorator) despite these being the primary runtimes for the repo's agents and tools.
**Question for Product Owner:** Should I implement a standardized Node.js helper (e.g., in `scripts/context_helpers.js` or a new `tools/resilience/` directory) to satisfy this requirement for all future agent work?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Create a standardized Node.js exponential backoff helper in `scripts/resilience_helpers.js` and update `scripts/audit-repo.js` to verify its usage in any new network-calling utilities.*

### ❓ Question [2026-04-02] - ROI Auditor Logging-MCP Discrepancy
**Context:** The `agents/guardian/roi-auditor.md` persona references a `logging-mcp` for ingesting agent execution logs, but this MCP is absent from `mcp.config.json` and `mcp-protocols/`.
**Ambiguity / Drift:** The `REQUIREMENTS.md` now documents this as a known limitation, but the ROI Auditor cannot function as described without this protocol.
**Question for Product Owner:** Is the `logging-mcp` intended to be a repo-defined protocol (e.g., connecting to Loki/Grafana), or should the ROI Auditor be updated to use a more generic `web-search` or `n8n` protocol for log ingestion?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Resolve the ROI Auditor protocol discrepancy by either creating the missing `mcp-protocols/logging-mcp.md` or updating the `roi-auditor.md` persona to use the approved `n8n` webhook pattern for log ingestion.*
