# Decision Log

## [2026-02-21] - Pivot to Standalone Agents and MCP
- **Decision**: The repository is strictly for standalone scripts and agents. The "Support Helper" will be an agent that connects to a WHMCS MCP server.
- **Context**: Clarification provided that this is an agents repo, and any WHMCS features should rely on an MCP server instead of hosting module code.
- **Impact**: Removed `src/addonmodule.php`. Completely rewrote `REQUIREMENTS.md` and answered all pending questions in `CLARIFICATIONS.md`.

### Resolved Clarifications (Archived)
- **New Platform**: Standalone AI agents and scripts.
- **Dashboard & Utilities**: No physical dashboard; functionality provided via MCP tools.
- **Legacy Code**: `src/addonmodule.php` and WHMCS-specific hooks/fields discarded.
- **Authentication & RBAC**: Handled by the execution environment/host platform.
- **Persistence**: Stateless execution; no dedicated database required.
- **Logging**: Standardized to `stdout` and `stderr`.
- **Configuration**: Managed via environment variables (secrets) and `mcp.config.json` (active MCPs).

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
