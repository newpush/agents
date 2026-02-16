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
