# Provisioned Client Tenants

This directory holds per-client configurations created by the
[Client Onboarding](../agents/operations/client-onboarding.md) agent.

## Layout

```
clients/
├── {client-id}/
│   └── mcp.config.json        # Tier-derived, client-customized
├── _archived/
│   └── {client-id}/           # Decommissioned tenants
└── README.md
```

## Rules

- One subdirectory per client tenant, slug-named.
- `mcp.config.json` is generated from a [`templates/tiers/`](../templates/tiers/)
  template and customized with client-specific parameters (org name,
  hostnames, contact metadata).
- **Never** commit real client tenants, vault references, or secrets to this
  repository. The `.gitignore` in this directory blocks all files except this
  README, the `.gitignore`, and the `_archived/` folder.
- Decommissioned tenants are moved into `_archived/{client-id}/` instead of
  being deleted, so the audit trail is preserved.
