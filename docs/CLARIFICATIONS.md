# Pending Clarifications

### Question 2026-02-16 - New Platform/Architecture
*   **Context:** The requirements have been updated to state that a WHMCS addon module is no longer planned. However, the current codebase in `src/addonmodule.php` is strictly built as a WHMCS module.
*   **Ambiguity:** Without a target platform (e.g., Standalone Web App, CLI Tool, different CMS plugin), we cannot define the new technical specifications.
*   **Question:** What is the intended platform or architectural framework for the NewPush Support Helper?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Core Functionality Replacement
*   **Context:** Ticketing has been removed from the scope, but the "Support Helper" still requires "support utilities" and a dashboard.
*   **Ambiguity:** The term "support utilities" is vague. The code currently only implements ticket listing.
*   **Question:** What specific utilities or tools should be included in the Support Dashboard now that ticketing is no longer involved?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Legacy Code Cleanup
*   **Context:** `src/addonmodule.php` contains WHMCS-specific hooks and ticketing simulation logic that are now contradictory to the updated requirements.
*   **Ambiguity:** It is unclear if this code should be refactored to a new structure or if it should be completely removed to start fresh.
*   **Question:** Should the existing WHMCS-based code in `src/` be discarded or refactored?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-18 - Legacy Configuration Fields
*   **Context:** The requirements state "Configuration: The tool must allow authorized users to enable/disable specific support features.", but the code in `src/addonmodule.php` implements `api_key` and `enable_auto_reply`.
*   **Ambiguity:** It is unclear if these specific legacy fields are intended to be part of the new platform's configuration requirements.
*   **Question:** Should the `api_key` and `enable_auto_reply` features be migrated to the new dashboard, or are they legacy drift to be discarded?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-18 - Undocumented Utility: Clear Cache
*   **Context:** The requirements mention "a dashboard of support utilities", but the code in `src/addonmodule.php` implements an undocumented `addonmodule_clear_cache()` function.
*   **Ambiguity:** It is unclear if "Clear Cache" is one of the intended "support utilities" for the new dashboard.
*   **Question:** Is the "Clear Cache" functionality a required utility for the new Support Dashboard?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-18 - Dashboard Performance Metric
*   **Context:** The requirements state "The dashboard should load quickly.", but the code in `src/addonmodule.php` has no performance monitoring or defined timeout thresholds.
*   **Ambiguity:** "Quickly" is a subjective term and cannot be tested without a specific metric.
*   **Question:** What is the maximum acceptable load time for the Support Dashboard (e.g., < 500ms)?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Cache Clearing Utility
*   **Context:** The requirements state that the dashboard should provide "support utilities", while the code in `src/addonmodule.php` implements an undocumented `addonmodule_clear_cache()` function.
*   **Ambiguity:** It is unclear if cache clearing is an intended feature of the new Support Helper or a remnant of legacy code.
*   **Question:** Should "Cache Clearing" be included as a functional requirement for the Support Helper dashboard?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Configuration Specifics (API & Auto-Reply)
*   **Context:** The requirements state "the tool must allow authorized users to enable/disable specific support features", but the code in `src/addonmodule.php` implements an `api_key` and `enable_auto_reply`.
*   **Ambiguity:** The requirements do not specify which features require configuration or if an external API integration is required.
*   **Question:** Which specific support features require configuration, and should the `api_key` and `enable_auto_reply` logic be preserved or replaced?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Performance Definition
*   **Context:** The requirements state "The dashboard should load quickly."
*   **Ambiguity:** "Quickly" is a subjective term and lacks a measurable technical metric for verification.
*   **Question:** What is the target maximum load time (e.g., in milliseconds) for the Support Dashboard?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Authentication Provider for Standalone App
*   **Context:** The requirements state that access must be restricted to "authenticated users with the appropriate permissions". With the WHMCS platform deprecated, the built-in WHMCS admin authentication is no longer available.
*   **Ambiguity:** A new authentication provider (e.g., OIDC, LDAP, or internal DB) is not specified.
*   **Question:** What is the intended authentication provider for the new standalone Support Helper?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Data Persistence Architecture
*   **Context:** The legacy code in `src/addonmodule.php` uses the WHMCS database for configuration storage, while `AGENTS.md` mandates a "Fetch-on-Demand" architecture for secrets.
*   **Ambiguity:** It is unclear where non-sensitive configuration (e.g., feature toggles) should be stored in the new architecture.
*   **Question:** Does the tool require a dedicated database (e.g., MySQL/PostgreSQL) for non-sensitive state and configuration, or should it use file-based storage?
*   **Answer:** [WRITE YOUR ANSWER HERE]

### Question 2026-02-16 - Standardized Error Handling & Reporting
*   **Context:** The legacy code uses WHMCS-specific `logActivity` for error reporting, which is flagged as `[PENDING]` in `REQUIREMENTS.md`.
*   **Ambiguity:** Modern architecture requires a standardized, non-proprietary logging interface.
*   **Question:** Should the Support Helper implement structured logging (e.g., JSON to stdout) or integrate with an external error tracking service like Sentry?
*   **Answer:** [WRITE YOUR ANSWER HERE]
