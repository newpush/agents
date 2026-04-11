# Pending Clarifications

This file now tracks only active, unresolved questions that still require product-owner input or an external artifact.

## Current Status

- **[2026-04-11]** Technical clarifications resolved via automated alignment with existing decisions and architecture. Remaining open questions focus on three strategic choices requiring CEO/PO input.
- Durable answers from the March-April 2026 clarification backlog were normalized into [DECISION_LOG.md](DECISION_LOG.md), especially the entries dated 2026-04-02 and 2026-04-11.
- Technical clarifications answered via consistency enforcement were closed and moved to the decision log.

## Strategic Decisions Requiring CEO/PO Input (3 remaining)

1. Environment Variable Inventory Drift (2026-04-04) - Should NOEMI_DOCKER_SMOKE_* vars be in .env.template?
2. logging-mcp Audit Log Alignment (2026-04-04) - Should Audit Log be part of logging-mcp payload?
3. SecretOps Syntax Standardization (2026-04-05) - Standardize on .env.template or .env.example?

See below for full details.

### Question [2026-04-04] - Environment Variable Inventory Drift

**Status:** Awaiting PO Input

**Context:** The .env.template file is intended to be a variable inventory. However, tests/e2e/docker-smoke.test.js references NOEMI_DOCKER_SMOKE_* variables not in .env.template.

**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]

### Question [2026-04-04] - logging-mcp Standardized Log Shape vs. Audit Log

**Status:** Awaiting PO Input

**Context:** logging-mcp defines one log shape, AGENTS.md mandates a different Audit Log JSON shape. Unclear if they are separate or one should nest in the other.

**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]

### Question [2026-04-05] - SecretOps Syntax Drift: .env.template vs .env.example

**Status:** Awaiting PO Input

**Context:** AGENTS.md uses --env-file=.env.template while examples use --env-file=.env.example. Need to standardize.

**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
