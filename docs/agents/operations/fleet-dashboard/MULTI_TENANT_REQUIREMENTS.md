# Fleet Dashboard Multi-Tenant Extensions — Initial Requirements

## Summary

Extensions to the existing Fleet Dashboard agent spec (`agents/operations/fleet-dashboard.md`) that add multi-tenant capabilities required for MSP deployments: tenant-scoped views, cross-client aggregation, and tenant-aware RBAC.

## Problem Statement

The current Fleet Dashboard spec assumes a single organizational context. An MSP operates across dozens or hundreds of client tenants, each with their own agent fleet. The dashboard must support both per-client views (for client-facing reports) and cross-client aggregation (for MSP operational oversight) without leaking data between tenants.

## Functional Requirements

### FR-1: Tenant Isolation

- Every ingested report must include a `tenant_id` field identifying the client
- All queries, views, and API responses must be scoped to a tenant by default
- Cross-tenant queries are restricted to MSP-admin roles (see FR-3)
- Storage must enforce tenant isolation — a query for Tenant A must never return Tenant B data, even in error conditions

### FR-2: Cross-Tenant Aggregation (MSP View)

MSP operators need a unified view across all tenants:

| View | Description |
|------|-------------|
| **Fleet overview** | Agent count, health status, and last activity per tenant |
| **Alert heatmap** | Cross-tenant view of anomalies, failures, and missed cycles |
| **SLA compliance** | Per-tenant adherence to response/resolution targets (linked to PSA SLA data) |
| **Activity volume** | Aggregate agent actions over time, segmented by tenant and agent type |
| **Tenant comparison** | Side-by-side operational metrics for benchmarking |

### FR-3: Tenant-Aware RBAC

| Role | Scope | Permissions |
|------|-------|-------------|
| **MSP Admin** | All tenants | Full dashboard access, cross-tenant views, retention policy management |
| **MSP Technician** | Assigned tenants | View dashboard and reports for assigned clients only |
| **Client Viewer** | Single tenant | Read-only view of their own tenant's agent activity and reports |
| **Client Admin** | Single tenant | View + export + manage alert preferences for their tenant |

Authentication integrates with the MSP's identity provider (Casdoor, Azure AD, or equivalent).

### FR-4: Tenant-Scoped Reporting

- Daily and weekly digest reports must be generated per-tenant
- MSP-level rollup reports aggregate across all tenants
- Reports must be exportable (CSV, JSON, PDF) with tenant branding where applicable
- Client-facing reports must exclude internal MSP operational data (agent configuration details, cross-tenant metrics)

### FR-5: Tenant Lifecycle Events

The dashboard must track and display tenant lifecycle events:

- Onboarding (new tenant provisioned)
- Tier change (upgrade/downgrade)
- Agent additions/removals
- Decommissioning (tenant archived)

These events integrate with the Client Onboarding Agent's handoff reports.

## Non-Functional Requirements

### Data Isolation Guarantees

- Tenant data must be logically isolated at the storage layer (row-level security or schema-per-tenant)
- API responses must be validated against the requesting user's tenant scope before delivery
- Audit logs must record which user accessed which tenant's data

### Performance at Scale

- The dashboard must remain responsive with 100+ active tenants
- Cross-tenant aggregation queries must complete within 5 seconds for the default time range (7 days)
- Per-tenant views must load within 2 seconds

### Retention

- Per-tenant retention policies (some clients may require longer retention for compliance)
- Default: 90 days detailed, 1 year aggregated (matching the base spec)
- Retention policy changes are an Ask First operation

## Changes to Base Spec

The following sections of `agents/operations/fleet-dashboard.md` require extension:

1. **Authentication & Trust Model** — Add Layer 4: Tenant Identity. Every report and query must carry a verified tenant context in addition to agent identity.
2. **REST API** — All endpoints gain an optional `?tenant_id=` parameter. Without it, responses are scoped to the caller's tenant. MSP Admin role can specify `?tenant_id=*` for cross-tenant queries.
3. **Ingestion schema** — Add required `tenant_id` field to the report schema.
4. **Anomaly detection** — Add cross-tenant anomaly patterns (e.g., one tenant's agent fleet goes silent while others are healthy).

## Integration Points

- **Client Onboarding Agent** — Registers new tenants and their agent identities
- **PSA/Ticketing MCP** — Pulls SLA data for compliance views
- **RMM MCP** — Correlates device alerts with agent activity per tenant
- **Identity provider** — RBAC enforcement and SSO

## Open Questions

1. Should tenant isolation be logical (row-level security) or physical (separate database/schema per tenant)?
2. What is the branding requirement for client-facing reports — white-label with MSP branding, or co-branded?
3. Should the cross-tenant aggregation views be real-time or based on pre-computed rollups?
4. How do we handle tenant data when a client churns — archive, anonymize, or delete?
