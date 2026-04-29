# Client Tier Templates

This directory contains starter `mcp.config.json` templates used by the
[Client Onboarding](../../agents/operations/client-onboarding.md) agent
during tenant provisioning.

Each tier defines the minimum set of active MCP integrations and reusable
skills available to a client tenant. Onboarding copies the appropriate
template into `clients/{client-id}/mcp.config.json` and customizes it
with client-specific parameters.

## Available Tiers

| Tier | File | Description |
|------|------|-------------|
| Basic | [`basic.json`](basic.json) | Minimum viable tenant — read-only repository tasks, no business systems integrations. |
| Standard | [`standard.json`](standard.json) | Adds the canonical Google Workspace + Slack + GitHub integrations and the standard skill set. |
| Premium | [`premium.json`](premium.json) | Full integration set, including n8n orchestration, Google Admin, and the full reusable skill catalogue. |

## Updating Tier Templates

- Templates must remain valid `mcp.config.json` payloads (`active_mcps` and
  `active_skills` arrays). They are validated indirectly through
  `tests/examples-smoke.test.js`.
- Add a new tier by creating a new `*.json` file and updating this README
  plus the `Client Onboarding` agent persona.
- Never embed secrets, tokens, or client-specific values in tier templates.
