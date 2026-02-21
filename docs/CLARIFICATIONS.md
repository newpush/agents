# Pending Clarifications

### Question 2026-02-16 - New Platform/Architecture
*   **Context:** The requirements have been updated to state that a WHMCS addon module is no longer planned. However, the current codebase in `src/addonmodule.php` is strictly built as a WHMCS module.
*   **Ambiguity:** Without a target platform (e.g., Standalone Web App, CLI Tool, different CMS plugin), we cannot define the new technical specifications.
*   **Question:** What is the intended platform or architectural framework for the NewPush Support Helper?
*   **Answer:** **RESOLVED.** This repository is exclusively a collection of standalone AI agents and scripts. Specific agents, like the "Support Helper", will be implemented as AI agent personas that rely on external tools, such as a WHMCS Model Context Protocol (MCP) server, for their functionality.

### Question 2026-02-16 - Core Functionality Replacement
*   **Context:** Ticketing has been removed from the scope, but the "Support Helper" still requires "support utilities" and a dashboard.
*   **Ambiguity:** The term "support utilities" is vague. The code currently only implements ticket listing.
*   **Question:** What specific utilities or tools should be included in the Support Dashboard now that ticketing is no longer involved?
*   **Answer:** **RESOLVED.** There is no "Support Dashboard" within this repository. The Support Helper agent will interact with users and use MCP tools provided by an external WHMCS MCP server to perform support utilities (e.g., clearing cache, checking system status).

### Question 2026-02-16 - Legacy Code Cleanup
*   **Context:** `src/addonmodule.php` contains WHMCS-specific hooks and ticketing simulation logic that are now contradictory to the updated requirements.
*   **Ambiguity:** It is unclear if this code should be refactored to a new structure or if it should be completely removed to start fresh.
*   **Question:** Should the existing WHMCS-based code in `src/` be discarded or refactored?
*   **Answer:** **RESOLVED.** Discarded. The legacy `src/addonmodule.php` file has been completely removed. There should be no WHMCS module code in this repository.

### Question 2026-02-18 - Legacy Configuration Fields
*   **Context:** The requirements state "Configuration: The tool must allow authorized users to enable/disable specific support features.", but the code in `src/addonmodule.php` implements `api_key` and `enable_auto_reply`.
*   **Ambiguity:** It is unclear if these specific legacy fields are intended to be part of the new platform's configuration requirements.
*   **Question:** Should the `api_key` and `enable_auto_reply` features be migrated to the new dashboard, or are they legacy drift to be discarded?
*   **Answer:** **RESOLVED.** Discarded. Legacy WHMCS fields are no longer relevant. Any configuration for the agent (like LLM API keys or MCP server connection details) will be managed via environment variables and the 1Password (`op`) CLI.

### Question 2026-02-18 - Undocumented Utility: Clear Cache
*   **Context:** The requirements mention "a dashboard of support utilities", but the code in `src/addonmodule.php` implements an undocumented `addonmodule_clear_cache()` function.
*   **Ambiguity:** It is unclear if "Clear Cache" is one of the intended "support utilities" for the new dashboard.
*   **Question:** Is the "Clear Cache" functionality a required utility for the new Support Dashboard?
*   **Answer:** **RESOLVED.** Cache clearing can be a capability of the Support Helper agent, but it will be executed by calling an external WHMCS MCP tool. It will not be implemented directly in PHP within this repo.

### Question 2026-02-18 - Dashboard Performance Metric
*   **Context:** The requirements state "The dashboard should load quickly.", but the code in `src/addonmodule.php` has no performance monitoring or defined timeout thresholds.
*   **Ambiguity:** "Quickly" is a subjective term and cannot be tested without a specific metric.
*   **Question:** What is the maximum acceptable load time for the Support Dashboard (e.g., < 500ms)?
*   **Answer:** **RESOLVED.** N/A. There is no dashboard to load. Performance metrics will instead apply to agent response times, which are subject to LLM inference and MCP network latency.

### Question 2026-02-16 - Cache Clearing Utility
*   **Context:** The requirements state that the dashboard should provide "support utilities", while the code in `src/addonmodule.php` implements an undocumented `addonmodule_clear_cache()` function.
*   **Ambiguity:** It is unclear if cache clearing is an intended feature of the new Support Helper or a remnant of legacy code.
*   **Question:** Should "Cache Clearing" be included as a functional requirement for the Support Helper dashboard?
*   **Answer:** **RESOLVED.** Same as above. It is an MCP tool capability utilized by the agent, not a functional requirement built into the agent itself.

### Question 2026-02-16 - Configuration Specifics (API & Auto-Reply)
*   **Context:** The requirements state "the tool must allow authorized users to enable/disable specific support features", but the code in `src/addonmodule.php` implements an `api_key` and `enable_auto_reply`.
*   **Ambiguity:** The requirements do not specify which features require configuration or if an external API integration is required.
*   **Question:** Which specific support features require configuration, and should the `api_key` and `enable_auto_reply` logic be preserved or replaced?
*   **Answer:** **RESOLVED.** Replaced. Configuration will solely consist of environment variables providing the agent with LLM credentials and MCP connection details via 1Password.

### Question 2026-02-16 - Performance Definition
*   **Context:** The requirements state "The dashboard should load quickly."
*   **Ambiguity:** "Quickly" is a subjective term and lacks a measurable technical metric for verification.
*   **Question:** What is the target maximum load time (e.g., in milliseconds) for the Support Dashboard?
*   **Answer:** **RESOLVED.** N/A. See Dashboard Performance Metric above.

### Question 2026-02-16 - Authentication Provider for Standalone App
*   **Context:** The requirements state that access must be restricted to "authenticated users with the appropriate permissions". With the WHMCS platform deprecated, the built-in WHMCS admin authentication is no longer available.
*   **Ambiguity:** A new authentication provider (e.g., OIDC, LDAP, or internal DB) is not specified.
*   **Question:** What is the intended authentication provider for the new standalone Support Helper?
*   **Answer:** **RESOLVED.** Authentication will be handled by the environment executing the agent (e.g., CLI authentication via 1Password for local execution, or the authentication mechanism of the external chat interface that hosts the agent).

### Question 2026-02-16 - Data Persistence Architecture
*   **Context:** The legacy code in `src/addonmodule.php` uses the WHMCS database for configuration storage, while `AGENTS.md` mandates a "Fetch-on-Demand" architecture for secrets.
*   **Ambiguity:** It is unclear where non-sensitive configuration (e.g., feature toggles) should be stored in the new architecture.
*   **Question:** Does the tool require a dedicated database (e.g., MySQL/PostgreSQL) for non-sensitive state and configuration, or should it use file-based storage?
*   **Answer:** **RESOLVED.** Agents are inherently stateless. They do not require a dedicated relational database. All configuration is loaded dynamically at runtime via environment variables (from 1Password or `.env` files).

### Question 2026-02-16 - Standardized Error Handling & Reporting
*   **Context:** The legacy code uses WHMCS-specific `logActivity` for error reporting, which is flagged as `[PENDING]` in `REQUIREMENTS.md`.
*   **Ambiguity:** Modern architecture requires a standardized, non-proprietary logging interface.
*   **Question:** Should the Support Helper implement structured logging (e.g., JSON to stdout) or integrate with an external error tracking service like Sentry?
*   **Answer:** **RESOLVED.** Agent scripts should use standardized logging to `stdout` and `stderr`.

### Question 2026-02-19 - Granularity of Permissions (RBAC)
*   **Context:** The requirements state that access must be restricted to "authenticated users with the appropriate permissions".
*   **Ambiguity:** It is unclear if a simple Admin/User distinction is sufficient, or if a more granular Role-Based Access Control (RBAC) system is required for different support utilities.
*   **Question:** What specific roles and permission levels should be supported in the new Support Dashboard?
*   **Answer:** **RESOLVED.** N/A. There is no dashboard. Agents run in an environment that handles its own RBAC.

### Question 2026-02-19 - Audit Logging Requirements
*   **Context:** The tool allows authorized users to toggle features and execute support utilities (like "Clear Cache").
*   **Ambiguity:** There is currently no requirement for auditing these actions. In a support environment, tracking who performed which action and when is often critical for security and troubleshooting.
*   **Question:** Should the Support Helper implement an audit log to track configuration changes and utility executions?
*   **Answer:** **RESOLVED.** N/A. Actions are logged by the MCP servers executing the tools, or the chat platform orchestrating the agent.

### Question 2026-02-19 - Utility Extensibility Architecture
*   **Context:** The requirements mention a "dashboard of support utilities".
*   **Ambiguity:** It is unclear if the list of utilities is expected to be static and hard-coded, or if the architecture should support a dynamic "plugin" system for adding new utilities without core code changes.
*   **Question:** Should the Support Dashboard be built with a dynamic plugin architecture for utilities, or is a hard-coded set of tools sufficient for the MVP?
*   **Answer:** **RESOLVED.** The agents use the Model Context Protocol (MCP) to dynamically discover tools provided by external servers.

### Question 2026-02-21 - Recursive Cache Clearing
*   **Context:** The current implementation of `addonmodule_clear_cache()` in `src/addonmodule.php` uses `glob($cacheDir . DIRECTORY_SEPARATOR . '*')` and only deletes files at the top level of the cache directory.
*   **Ambiguity:** It is unclear if the cache clearing utility should be recursive (deleting files in subdirectories) or if it should only target specific file types/patterns.
*   **Question:** Should the Support Dashboard's cache clearing utility perform a recursive deletion, and are there specific file patterns it should avoid?
*   **Answer:** **RESOLVED.** N/A. The `addonmodule_clear_cache()` and its associated code have been deleted.

### Question 2026-02-21 - Mandatory Environment Variables for .env.template
*   **Context:** `AGENTS.md` mandates the use of `op run --env-file=.env.template` for secret resolution.
*   **Ambiguity:** While sensitive credentials are to be fetched from 1Password, the non-sensitive environment variables that must be present in `.env.template` are not defined.
*   **Question:** What are the specific non-sensitive environment variables (e.g., `APP_ENV`, `LOG_LEVEL`, `CACHE_PATH`) that must be included in the `.env.template` for the new platform?
*   **Answer:** **RESOLVED.** Agents require configuration such as `ACTIVE_MCPS`, but standard configuration is currently tracked via `mcp.config.json` and API keys are injected via 1Password.

### Question 2026-02-21 - Target Runtime Environment (PHP Version & Extensions)
*   **Context:** The legacy codebase in `src/` is written in PHP and uses extensions like `glob` and filesystem functions.
*   **Ambiguity:** With the move away from WHMCS, the target PHP version and required extensions for the new standalone application have not been specified.
*   **Question:** What is the target PHP version (e.g., 8.2, 8.3) and what mandatory PHP extensions are required for the new Support Helper application?
*   **Answer:** **RESOLVED.** N/A. The legacy PHP codebase has been completely removed. We are using agent orchestrators (e.g., Node.js/Python based like Gemini CLI or others) connecting to external MCP servers.