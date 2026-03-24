# PSA/Ticketing MCP — Initial Requirements

## Summary

An MCP protocol definition that enables NoéMI agents to interact with Professional Services Automation (PSA) and ticketing platforms commonly used by MSPs — primarily ConnectWise Manage, Datto Autotask, and HaloPSA.

## Problem Statement

MSPs live in their PSA tool. Without a ticketing MCP, agents cannot create, update, or triage service tickets — the core unit of MSP work. Technicians must manually bridge agent outputs into the PSA, eliminating the automation benefit.

## Target Platforms (Priority Order)

1. **ConnectWise Manage** — Largest MSP market share
2. **Datto Autotask PSA** — Strong in SMB MSP segment
3. **HaloPSA** — Growing alternative, modern API

Each platform gets its own MCP file (`mcp-protocols/connectwise.md`, `mcp-protocols/autotask.md`, `mcp-protocols/halopsa.md`) following the same protocol structure.

## Functional Requirements

### FR-1: Ticket Operations

| Operation | Description |
|-----------|-------------|
| **List tickets** | Query tickets by status, priority, queue, client, date range |
| **Get ticket** | Retrieve full ticket detail including notes and time entries |
| **Create ticket** | Create a new service ticket with summary, description, priority, client, and queue assignment |
| **Update ticket** | Modify status, priority, assignment, or add notes to an existing ticket |
| **Add note** | Append an internal or external note to a ticket |
| **Add time entry** | Log time against a ticket (for agent activity tracking) |

### FR-2: Client/Company Operations

| Operation | Description |
|-----------|-------------|
| **List clients** | Query the client/company directory |
| **Get client** | Retrieve client detail including contacts and SLA information |
| **Map client** | Resolve a NoéMI tenant ID to a PSA company record |

### FR-3: Queue and Dispatch

| Operation | Description |
|-----------|-------------|
| **List queues** | Enumerate available service boards/queues |
| **Assign ticket** | Move a ticket to a queue or assign to a resource |
| **Escalate ticket** | Increase priority and/or reassign based on SLA thresholds |

### FR-4: SLA Awareness

Agents consuming this MCP should be able to query SLA status for a ticket and factor response/resolution deadlines into triage decisions.

## Protocol Structure

Each MCP file should follow the established pattern in `mcp-protocols/` with:

1. **Overview** — Platform name, API version, authentication method
2. **Authentication** — How credentials are resolved from the vault (API keys, client ID/secret, etc.)
3. **Operations** — Structured list of available operations with parameters
4. **Validation** — How to verify API connectivity and permissions
5. **Error Handling** — Common error codes and retry guidance
6. **Rate Limits** — Platform-specific rate limit details

## Security Requirements

- All API credentials stored in vault (`op://MSP-Clients/{ClientID}/connectwise-api-key`)
- The MCP must support per-client credential resolution (MSP manages multiple PSA tenants)
- Ticket creation and updates must include an audit trail note identifying the agent that performed the action
- PII Guard must be invoked before writing client-facing ticket notes

## Integration Points

- **Knowledge Manager agent** — Triage incoming tickets, classify, and route
- **Fleet Dashboard** — Log all ticket operations as agent activity
- **n8n workflows** — Trigger agent actions on ticket events (new ticket, SLA breach)
- **Client Onboarding agent** — Map new NoéMI tenants to PSA company records

## Open Questions

1. Should we build a generic ticketing MCP with platform adapters, or keep each platform as a separate MCP file?
2. How do we handle PSA platforms that require OAuth flows (interactive auth) vs. API key auth?
3. What is the minimum ticket field set that works across all three platforms?
