# Pending Clarifications

<!-- Add new questions below this line using the required format -->

### ❓ Question [2026-03-03] - Python Runtime Dependency Contradiction
**Context:** The `REQUIREMENTS.md` explicitly states that "Python runtime support is officially deprecated," yet the `scripts/verify-env.sh` pre-flight check still mandates the presence of `python3` (line 19).
**Ambiguity / Drift:** This creates confusion for new users and automated CI/CD pipelines. It is unclear if Python is required for specific examples or if the pre-flight check is simply outdated.
**Question for Product Owner:** Should the `python3` check be removed from `verify-env.sh`, or are there specific components (e.g., in `examples/`) that still strictly require a Python environment?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *[If Python is truly deprecated, please command me to remove the `python3` check from `scripts/verify-env.sh` and `verify-env.ps1` to align with the core requirements.]*

### ❓ Question [2026-03-03] - Missing Casdoor Integration in Fleet Deployment
**Context:** The `REQUIREMENTS.md` (Strategic Alignment, Item 4) specifies that Fleet Deployment infrastructure requires "Casdoor (identity)" as part of the multi-tenant stack. However, `examples/fleet-deployment/docker-compose.yml` does not implement a Casdoor service.
**Ambiguity / Drift:** The core requirement for identity management is documented but not present in the provided reference architecture, preventing a complete "Fleet" demonstration.
**Question for Product Owner:** Is there a preferred Casdoor configuration or Docker image we should use to complete this example, or is identity management currently being handled by another component not shown in the compose file?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *[Please provide the Casdoor configuration details so I can update `examples/fleet-deployment/docker-compose.yml` to satisfy the Strategic Alignment requirement for identity management.]*

### ❓ Question [2026-03-03] - Status of ROI Calculator Scripts
**Context:** `REQUIREMENTS.md` states the toolkit must include "Python/Excel-based ROI calculator scripts" (Strategic Alignment, Item 5). These files are not present in the repository.
**Ambiguity / Drift:** A high-priority "Feynman Requirement" for automated validation and ROI modeling is documented as a core deliverable but has no implementation or placeholder.
**Question for Product Owner:** Are the ROI calculator scripts intended to be part of this repository, and if so, can you provide the logic or templates that should be implemented?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *[Once the ROI logic is clarified, please command me to create the missing ROI calculator scripts in a new `tools/roi/` directory as specified in the strategic alignment.]*

### ❓ Question [2026-03-03] - Global Security Mandate Injection Drift
**Context:** `AGENTS.md` defines critical security rules (e.g., "NEVER ask for secrets", "ALWAYS use 1Password CLI"). However, `scripts/generate_gemini.js` does not currently inject these mandates into the generated `GEMINI.md`.
**Ambiguity / Drift:** This creates a risk where agents might not be aware of global security policies if they only ingest their specific persona file. The requirement for injection is documented in `DECISION_LOG.md` but not implemented.
**Question for Product Owner:** Should `scripts/generate_gemini.js` be updated to automatically inject the content of `AGENTS.md` into every generated `GEMINI.md`, or should this be handled by the external orchestrator?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *[Please command me to update `scripts/generate_gemini.js` to include a new injection phase that prepends the global security mandates from `AGENTS.md` to the final `GEMINI.md` output.]*

### ❓ Question [2026-03-03] - Documentation Mirror Maintenance Strategy
**Context:** `REQUIREMENTS.md` mandates that `docs/agents/` strictly mirror the hierarchy of `agents/`. Currently, there is significant drift (e.g., engineering, marketing, and operations domains have files in `agents/` but are empty in `docs/agents/`).
**Ambiguity / Drift:** It is unclear if the `docs/agents/` mirror should contain full duplicates of the persona files, or if it is intended for human-readable guides (like `video-automation-user-guide.md`).
**Question for Product Owner:** Should the `docs/agents/` directories contain exact copies of the `.md` persona files from `agents/` for easier human browsing, or is the mirror intended for supplementary documentation only?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *[Once the mirroring strategy is confirmed, please command me to synchronize the `docs/agents/` directory to match the source of truth in `agents/`.]*
