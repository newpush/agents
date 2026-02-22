# Pending Clarifications

<!-- Add new questions below this line -->

### Question 2026-02-22 - Missing .env.template
*   **Context:** `AGENTS.md` mandates the use of `op run --env-file=.env.template` for secret resolution, and several archived decisions refer to it. However, `.env.template` is missing from the repository root.
*   **Ambiguity:** Without this file, developers cannot identify the required environment variables for the agents and their MCP integrations.
*   **Question:** What is the mandatory baseline content for `.env.template`?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-22 - Documentation Mirroring Enforcement
*   **Context:** `README.md` states that `docs/agents/` must strictly mirror the `agents/` directory structure. Currently, several domains (engineering, marketing, operations) are missing from `docs/agents/`, and existing directories only contain `.gitkeep` files.
*   **Ambiguity:** It is unclear if this mirroring is a purely manual documentation task or if there should be an automated script to maintain this structure.
*   **Question:** Should the `docs/agents/` hierarchy be maintained manually, or should we implement a script (similar to `generate_gemini.js`) to enforce this structure?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-22 - Technical Specification for Agent Execution Runtime
*   **Context:** Functional Requirement 1 states agents are defined via Markdown, and Operational Requirement 1 states they can be executed as standalone scripts. The only executable script in the repo is Node.js-based (`generate_gemini.js`).
*   **Ambiguity:** The requirements do not specify a mandatory runtime (e.g., Node.js, Python, or a specific CLI like `gemini`) for executing the "standalone scripts" or personas.
*   **Question:** What is the recommended or mandatory runtime environment/CLI for executing the agent personas and utility scripts defined in this repository?
*   **Answer:** [WRITE YOUR ANSWER HERE]
