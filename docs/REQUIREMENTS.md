# NewPush Support Helper - Requirements

## Overview
The NewPush Support Helper is a tool designed to provide quick access to support utilities. (Note: Initial plans for a WHMCS addon module have been deprecated).

## Functional Requirements
1. **Configuration**: The tool must allow authorized users to enable/disable specific support features.
    - [PENDING] Clarify if legacy fields `api_key` and `enable_auto_reply` are required in the new architecture.
    - **Drift Warning**: Current codebase (`src/addonmodule.php`) defines an `api_key` in the `addonmodule_config` function, which is intended for local database storage. This contradicts the mandatory "Fetch-on-Demand" security architecture.
2. **Admin Interface**: The tool must have an interface that displays a dashboard of support utilities.
    - **Legacy Drift**: The current codebase (`src/addonmodule.php`) still contains `addonmodule_get_recent_tickets()` and logic in `addonmodule_output()` to display tickets. This functionality is deprecated and should be decommissioned.
    - **Support Utilities**: The legacy `addonmodule_clear_cache()` utility has been identified in the codebase as a candidate for the new dashboard.
        - **Implementation Detail (Drift)**: Current logic in `src/addonmodule.php` implements a non-recursive file deletion within a hardcoded `cache/` directory relative to the script.
3. **Security**: Access to the interface must be restricted to authenticated users with the appropriate permissions.
    - [PENDING] Define specific authentication protocols and permission levels (legacy WHMCS auth is deprecated).
    - **Access Control Drift**: The codebase currently uses a hardcoded `die("This file cannot be accessed directly");` check for a `WHMCS` constant, which is a legacy platform dependency.
   - **Fetch-on-Demand**: The tool must follow a "Fetch-on-Demand" architecture. All sensitive credentials (e.g., API keys) must be stored exclusively in 1Password Vaults and never hardcoded or stored in the application database.
   - **Runtime Resolution**: Secrets must be resolved at runtime using the 1Password CLI (`op`).
   - **Execution Pattern**: Commands requiring secrets must be wrapped using `op run --env-file=.env.template` to inject credentials directly into process memory.
4. **Performance**: The dashboard should load quickly.
    - [PENDING] Establish a concrete performance metric (e.g., page load < 500ms).

## Operational Requirements
1. **Error Handling**: The system must handle failures gracefully.
   - **Graceful Degradation**: If a specific utility fails (e.g., cache clearing), the rest of the dashboard should remain functional.
   - **User Feedback**: Errors should be caught and reported to the user via a friendly message, while technical details are logged server-side.

## Technical Specifications
- [PENDING] Target platform and architecture are currently under review.
- [PENDING] Database requirements depend on final architecture (Legacy implementation uses WHMCS database for configuration).
- [PENDING] Error logging and reporting standards are to be defined (Legacy implementation uses WHMCS `logActivity`).
