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

### Question 2026-02-25 - Missing .env.template for Secret Resolution
*   **Context:** `AGENTS.md` and project memories specify that secrets should be resolved using `op run --env-file=.env.template`. However, the `.env.template` file is missing from the repository.
*   **Ambiguity:** Developers and agents lack a template to define the required environment variables for various integrations (e.g., n8n, Slack).
*   **Question:** Should a `.env.template` be added to the root directory, or is there another intended method for defining the required environment variable keys?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-25 - Python Runtime Environment Support
*   **Context:** `REQUIREMENTS.md` states that agents are designed for cross-platform compatibility, "primarily utilizing Node.js or Python environments." The current codebase only contains Node.js scripts.
*   **Ambiguity:** There are no Python-specific files (e.g., `requirements.txt`, `pyproject.toml`, or agent runners) to support the stated requirement.
*   **Question:** Is Python support planned for a future phase, and if so, what is the expected timeline or specific use case (e.g., specific agent runners)?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-25 - Consistent "NoeMI" Branding
*   **Context:** `REQUIREMENTS.md` mentions "Project NoeMI" and "AI agents (NoeMI)", but this branding is absent from the `README.md`, `GEMINI.template.md`, and individual agent personas.
*   **Ambiguity:** It is unclear if "NoeMI" is the official project name or an internal codename that should be standardized or removed.
*   **Question:** Should "NoeMI" be adopted as the official branding across all documentation, or should it be removed from `REQUIREMENTS.md`?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-26 - Persona Template Standardization
*   **Context:** `REQUIREMENTS.md` states agents must be defined using "Role, Tone, Capabilities, and Rules", which is followed by `ai-architect.md` and `brand-strategist.md`. However, `agents/coding/bolt/core.md` and `agents/coding/sentinel/core.md` use a divergent format (Role, Mission, Core Mandates, Workflow, Journal, Boundaries).
*   **Ambiguity:** Lack of a single source of truth for agent persona templates makes maintenance and scaling of the library difficult.
*   **Question:** Should all agents be migrated to the "Role, Tone, Capabilities, and Rules" format, or are there different classes of agents (e.g., "Standard" vs "Specialized/Task-Oriented") that require different templates?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-26 - Execution Context and Tooling References
*   **Context:** The personas for Bolt and Sentinel refer to `pnpm lint` and `pnpm test` as verification steps. This repository does not use `pnpm` and has no `package.json`.
*   **Ambiguity:** It is unclear if these agents are meant to operate on the repository they are stored in (which lacks these tools), or if they are intended to be deployed into external environments where these tools are expected.
*   **Question:** Should agent personas be generic regarding their verification tools, or should they assume a specific runtime environment?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-26 - Global Security Mandate Injection
*   **Context:** `AGENTS.md` defines critical security rules (e.g., "NEVER ask for secrets", "ALWAYS use 1Password CLI"). These are not currently reflected in the "Rules" or "Boundaries" sections of the individual agent personas, nor are they injected into `GEMINI.md`.
*   **Ambiguity:** Agents might not be aware of these global security mandates if they only ingest their specific persona file.
*   **Question:** Should the global security and execution mandates from `AGENTS.md` be automatically injected into `GEMINI.md` via the generation script, or should they be manually added to each agent's "Rules" section?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-27 - Pre-flight Script vs. Security Mandate
*   **Context:** `scripts/verify-env.sh` prompts users to save a `GEMINI_API_KEY` in a local `.env` file, but `AGENTS.md` and `REQUIREMENTS.md` mandate a "Fetch-on-Demand" architecture where secrets are never hardcoded or stored locally.
*   **Ambiguity:** The current pre-flight script encourages a practice that is explicitly forbidden by the project's security policy.
*   **Question:** Should `verify-env.sh` be refactored to use 1Password CLI (`op`) for key verification and follow the `op run` pattern instead of local `.env` storage?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-27 - Undocumented "Gemini CLI" Dependency
*   **Context:** `scripts/verify-env.sh` checks for a `gemini` command, but this tool is not mentioned in `REQUIREMENTS.md` nor is it a standard utility in common environments.
*   **Ambiguity:** It is unclear which "Gemini CLI" is required (e.g., a specific npm package, a Go binary, or a custom script) and where it should be sourced from.
*   **Question:** What is the specific source or documentation for the required `gemini` CLI tool, and should it be added to the technical specifications in `REQUIREMENTS.md`?
*   **Answer:** [WRITE YOUR ANSWER HERE]
