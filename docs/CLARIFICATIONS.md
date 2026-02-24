# Pending Clarifications

<!-- Add new questions below this line using the required format -->

### Question 2026-02-21 - Missing Support Helper and WHMCS MCP Components
*   **Context:** The recently resolved clarifications state that specific agents like the "Support Helper" rely on a "WHMCS Model Context Protocol (MCP) server". However, the `agents/` directory does not contain a Support Helper persona, and `mcp-protocols/` lacks a `whmcs.md` definition.
*   **Ambiguity:** Architectural decisions reference these components, but they are not present in the repository, making it impossible to verify the implementation against the specs.
*   **Question:** Are the "Support Helper" persona and "WHMCS MCP" protocol documentation planned for this repository, or are they maintained in an external system?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-21 - Agent Execution Mechanism (Runner)
*   **Context:** `REQUIREMENTS.md` states that agents can be executed as "standalone scripts via CLI". The current codebase only contains `scripts/generate_gemini.js` for context assembly.
*   **Ambiguity:** There is no clear mechanism or example of how to "execute" a persona defined in Markdown using the toolkit.
*   **Question:** Is there an intended generic runner (e.g., a Python or Node.js script) that consumes these personas and the generated `GEMINI.md`, or is execution handled by an external orchestrator?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-21 - Documentation Mirroring Drift (`docs/agents/`)
*   **Context:** Project guidelines mandate that `docs/agents/` strictly mirror the hierarchy of `agents/`. Currently, `docs/agents/` is missing multiple domains (e.g., `engineering`, `marketing`, `operations`) found in the root `agents/` folder.
*   **Ambiguity:** This indicates significant drift between the codebase structure and its required documentation mirror.
*   **Question:** Should the `docs/agents/` mirror be updated manually to match the current `agents/` structure, or is this mirroring requirement being deprecated?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-24 - Standardized Logging Implementation
*   **Context:** `REQUIREMENTS.md` states that "Technical details must be logged using standardized logging to stdout and stderr."
*   **Ambiguity:** Since agents are defined as Markdown personas rather than executable code, it is unclear if "standardized logging" refers to a specific output format the persona must follow, or if this is a requirement for the (currently missing) agent runner/orchestrator.
*   **Question:** Should agent personas be updated with a "Logging" section defining their output format, or is this requirement handled by the execution environment?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-24 - Configuration Source of Truth
*   **Context:** `REQUIREMENTS.md` specifies that configuration must be handled "entirely via environment variables," but `scripts/generate_gemini.js` currently relies on `mcp.config.json` to determine active MCPs.
*   **Ambiguity:** There is a conflict between the documented requirement and the actual implementation for managing active integrations.
*   **Question:** Should `mcp.config.json` be deprecated in favor of an `ACTIVE_MCPS` environment variable, or should the requirements be updated to recognize the JSON configuration as the source of truth?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-24 - Agent Resilience and Tool Failure Directives
*   **Context:** `REQUIREMENTS.md` requires that "Agents must handle tool execution and API failures gracefully."
*   **Ambiguity:** Most agent personas (e.g., `agents/coding/bolt/core.md`) do not currently contain instructions on how to behave when an MCP tool fails or returns an error.
*   **Question:** Should a standardized "Error Handling" or "Resilience" section be added to all agent persona templates to guide their behavior during tool failures?
*   **Answer:** [WRITE YOUR ANSWER HERE]
