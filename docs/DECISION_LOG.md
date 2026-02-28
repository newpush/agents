# Decision Log

## [2026-02-28] - Comprehensive Documentation and Drift Resolution
- **Decision**: Answered all pending clarification questions and resolved documentation drifts.
- **Context**: Project required cleanup of requirements, branding standardization to "Project NoéMI", creation of `.env.template`, and clarifying the execution model (this is purely a definitions library for external orchestrators).
- **Impact**:
    - Created missing mirror directories in `docs/agents/`.
    - Added `.env.template` to the repository root.
    - Updated `REQUIREMENTS.md` to remove `[PENDING]` drifts and reflect updated consensus on stateless execution, standard persona templates, and removal of Python runtime requirements.
    - Updated `CLARIFICATIONS.md` with explicit answers.
    - Updated `README.md` to reflect Project NoéMI branding.

## [2026-02-21] - Pivot to Standalone Agents and MCP
- **Decision**: The repository is strictly for standalone scripts and agents. The "Support Helper" will be an agent that connects to a WHMCS MCP server.
- **Context**: Clarification provided that this is an agents repo, and any WHMCS features should rely on an MCP server instead of hosting module code.
- **Impact**: Removed `src/addonmodule.php`. Completely rewrote `REQUIREMENTS.md` and answered all pending questions in `CLARIFICATIONS.md`.

## [2026-02-21] - Resolved Architecture and Operational Clarifications
- **Decision**: Formally integrated architecture, security, and operational resolutions into `REQUIREMENTS.md`.
- **Impact**:
    - Verified that Auth/RBAC/Audit are delegated to the execution environment.
    - Standardized logging to `stdout`/`stderr`.
    - Confirmed stateless execution model.
    - Explicitly documented the pivot away from WHMCS PHP modules to standalone agents.
- **Resolved Questions**:
    - **New Platform/Architecture**: The repository is exclusively a collection of standalone AI agents and scripts. Support Helper will be a persona relying on external WHMCS MCP.
    - **Core Functionality Replacement**: No "Support Dashboard"; Support Helper uses MCP tools (cache clearing, status checks).
    - **Legacy Code Cleanup**: `src/addonmodule.php` removed.
    - **Legacy Configuration Fields**: Discarded. Config via env vars and 1Password.
    - **Undocumented Utility (Clear Cache)**: Handled by external WHMCS MCP tool.
    - **Performance Metrics**: Applies to agent response times, not a dashboard.
    - **Authentication Provider**: Delegated to execution environment (CLI/Orchestrator).
    - **Data Persistence**: Stateless execution; no relational DB required.
    - **Standardized Error Handling**: Use standardized logging to `stdout` and `stderr`.
    - **RBAC & Auditing**: Delegated to host platform or MCP server.
    - **Utility Extensibility**: Dynamic via Model Context Protocol (MCP).
    - **Target Runtime Environment**: Cross-platform (Node.js/Python), no longer PHP-specific.

## [2026-02-15] - Project Direction Pivot
- **Decision**: The project is no longer being developed as a WHMCS Addon Module.
- **Context**: Answer provided in CLARIFICATIONS.md regarding Cache Clearing Feature.
- **Impact**: REQUIREMENTS.md updated to remove WHMCS dependencies.

## [2026-02-15] - Removal of Support Ticketing
- **Decision**: Support ticket management is removed from the scope of this tool.
- **Context**: Answer provided in CLARIFICATIONS.md regarding Dashboard Performance Metric.
- **Impact**: REQUIREMENTS.md updated to remove ticketing functional requirements.

## [2026-02-15] - API Timeout Handling De-prioritization
- **Decision**: Specific API timeout handling is currently N/A.
- **Context**: Answer provided in CLARIFICATIONS.md regarding API Timeout Handling.
- **Impact**: Requirement removed from REQUIREMENTS.md.

## [2026-02-16] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: Requirements updated based on codebase drift and security policy (1Password) analysis.

## [2026-02-19] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated to explicitly flag legacy ticketing drift and security policy conflicts in `src/addonmodule.php`. Added new questions to CLARIFICATIONS.md regarding RBAC, Audit Logging, and Extensibility.

## [2026-02-21] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated based on codebase analysis of `src/addonmodule.php` and security policy in `AGENTS.md`. Identified specific implementation drift in cache clearing and access control. Integrated "Fetch-on-Demand" execution patterns.

## [2026-02-24] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated to incorporate missing agent domains (engineering, marketing, operations) found in the codebase. Flagged several items as [PENDING] due to implementation drift (Support Helper, WHMCS MCP, Config via env vars, and Standardized Logging). Added new questions to CLARIFICATIONS.md to resolve these ambiguities.

## [2026-02-25] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated to flag newly identified implementation drifts: missing `.env.template` for secret resolution, lack of Python runtime environment support, and inconsistent "NoeMI" branding. Added corresponding questions to CLARIFICATIONS.md.

## [2026-02-26] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated to flag newly identified implementation drifts: inconsistent persona templates in `agents/coding/` (Bolt, Sentinel) and references to external tooling (`pnpm`, `npm test`) not present in this repository. Added corresponding questions to CLARIFICATIONS.md regarding template standardization, execution context, and global security mandate injection.

## [2026-02-27] - Documentation Audit
- **Status**: No new human feedback provided in CLARIFICATIONS.md.
- **Action**: REQUIREMENTS.md updated to resolve "Project NoéMI" branding and specify the missing agent domain manual directories. Flagged the architectural contradiction between the "Stateless Execution" mandate and the `pgvector` "Memory Layer" found in Docker examples. Added new questions to CLARIFICATIONS.md regarding the memory layer and core system dependencies (Docker, Gemini CLI).
