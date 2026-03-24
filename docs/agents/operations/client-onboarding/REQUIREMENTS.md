# Client Onboarding Agent — Initial Requirements

## Summary

An operations agent that automates the provisioning of a new MSP client tenant within the NoéMI framework. It replaces the manual steps of creating vault compartments, forking configs, generating context files, and running validation — reducing onboarding from hours to minutes.

## Problem Statement

Onboarding a new MSP client requires a sequence of coordinated steps across multiple systems (vault, config repo, orchestrator, dashboard). Manual execution is error-prone, inconsistent, and does not scale as the client base grows.

## Functional Requirements

### FR-1: Tenant Provisioning Workflow

The agent must execute a structured onboarding workflow:

1. **Intake** — Accept client metadata: client ID, display name, tier (Basic/Standard/Premium), primary contact, and domain-specific parameters (e.g., server hostnames, cPanel endpoints).
2. **Vault Setup** — Create the client's vault compartment and populate placeholder entries for all secrets required by the selected tier's MCPs.
3. **Config Generation** — Generate `clients/{client-id}/mcp.config.json` from a tier template, customized with client-specific parameters.
4. **Context Build** — Run `generate_gemini.js` with the new client config to produce the client's `GEMINI.md`.
5. **Validation** — Execute a subset of the Red Team Gauntlet scoped to the client's agent configuration.
6. **Dashboard Registration** — Register the client's agent identities and HMAC signing secrets with the Fleet Dashboard.
7. **Handoff Report** — Produce a structured summary of everything provisioned, including any manual steps remaining (e.g., credential population in the vault).

### FR-2: Idempotency

Re-running the onboarding workflow for an existing client must not duplicate or overwrite resources. The agent must detect existing state and skip or update accordingly.

### FR-3: Tier Upgrade / Downgrade

The agent must support modifying an existing client's tier, adding or removing agents and MCPs as appropriate, and regenerating the context file.

### FR-4: Decommissioning

The agent must support a teardown workflow that revokes dashboard registrations, archives the client config, and flags vault entries for manual review (never auto-deletes secrets).

## Non-Functional Requirements

- **Safety:** All destructive actions (vault deletion, config removal) require explicit human confirmation via the "Ask First" boundary.
- **Auditability:** Every provisioning action must be logged with timestamp, actor, and outcome.
- **Secrets:** The agent never reads or stores secret values — it creates vault entry placeholders and references.

## Agent Spec Outline

The agent spec (`agents/operations/client-onboarding.md`) should follow `docs/AGENT_TEMPLATE.md` with:

- **Role:** MSP Client Onboarding Specialist
- **Tone:** Methodical, thorough, safety-conscious
- **Capabilities:** Tenant provisioning, tier management, validation orchestration, decommissioning
- **Rules & Constraints (4D Diligence):**
  1. Discovery before action — verify no existing tenant state before provisioning
  2. Least privilege — create only what the tier requires
  3. Never handle raw secrets — only create vault references
  4. Validate before handoff — gauntlet must pass before declaring onboarding complete
- **Boundaries:**
  - Always: Log every action, validate idempotency, produce a handoff report
  - Ask First: Decommissioning, tier downgrade, vault entry deletion
  - Never: Store secrets in config files, skip validation, overwrite existing tenant without confirmation

## Dependencies

- Vault CLI (`op` / `infisical`) for compartment management
- `scripts/generate_gemini.js` for context generation
- Fleet Dashboard API for agent registration
- Red Team Gauntlet scripts for validation

## Open Questions

1. Should the onboarding agent run as an n8n workflow, a standalone CLI script, or both?
2. What is the minimum viable validation subset for onboarding (full gauntlet may be too slow for rapid provisioning)?
3. How should client metadata be stored — Git-tracked YAML, a database, or the vault itself?
