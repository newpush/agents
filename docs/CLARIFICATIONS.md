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
