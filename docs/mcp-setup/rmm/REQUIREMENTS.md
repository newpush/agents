# RMM MCP — Initial Requirements

## Summary

An MCP protocol definition that enables NoéMI agents to interact with Remote Monitoring and Management (RMM) platforms used by MSPs for endpoint visibility, alerting, and remote administration — primarily Datto RMM, NinjaRMM, and N-able N-central.

## Problem Statement

MSP infrastructure agents (`infrastructure/linux`, `infrastructure/cpanel`) currently operate through direct CLI access. In a multi-client MSP environment, endpoints are managed through an RMM platform that provides centralized inventory, alerting, patching, and remote access. Without an RMM MCP, agents cannot correlate their work with the MSP's device inventory or respond to RMM-generated alerts.

## Target Platforms (Priority Order)

1. **Datto RMM** — Widely deployed, REST API available
2. **NinjaRMM** — Developer-friendly API, growing market share
3. **N-able N-central** — Enterprise MSP segment

Each platform gets its own MCP file (`mcp-protocols/datto-rmm.md`, `mcp-protocols/ninjaone.md`, `mcp-protocols/n-able.md`).

## Functional Requirements

### FR-1: Device Inventory

| Operation | Description |
|-----------|-------------|
| **List devices** | Query devices by client, site, OS, status, or custom filter |
| **Get device** | Retrieve device detail: hostname, OS, IP, agent status, last seen, patch status |
| **Get device alerts** | List active alerts for a specific device |
| **Search devices** | Full-text search across device inventory |

### FR-2: Alert Management

| Operation | Description |
|-----------|-------------|
| **List alerts** | Query active alerts by severity, category, client, or device |
| **Get alert** | Retrieve alert detail including diagnostic data |
| **Acknowledge alert** | Mark an alert as acknowledged (with agent identity in the note) |
| **Resolve alert** | Close an alert with a resolution note |

### FR-3: Remote Actions (Guarded)

| Operation | Description | Boundary |
|-----------|-------------|----------|
| **Run script** | Execute a pre-approved script on a device | Ask First |
| **Reboot device** | Initiate a device reboot | Ask First |
| **Install patch** | Apply a specific approved patch | Ask First |
| **Get script output** | Retrieve results of a previously executed script | Always |

All remote actions are **Ask First** — the agent must present the action plan and receive human confirmation before execution.

### FR-4: Monitoring Data

| Operation | Description |
|-----------|-------------|
| **Get device metrics** | CPU, memory, disk utilization for a device |
| **Get patch status** | Pending, installed, and failed patches per device |
| **Get antivirus status** | AV agent status and last scan time |

## Protocol Structure

Follow the established `mcp-protocols/` pattern:

1. **Overview** — Platform, API version, base URL pattern
2. **Authentication** — API key or OAuth credentials from vault
3. **Operations** — Categorized by function (inventory, alerts, actions, monitoring)
4. **Validation** — Connectivity check and permission verification
5. **Error Handling** — Common failure modes (device offline, rate limit, permission denied)
6. **Rate Limits** — Per-platform throttling details

## Security Requirements

- Credentials stored per-client in vault (`op://MSP-Clients/{ClientID}/datto-rmm-api-key`)
- Remote actions (script execution, reboot, patching) require explicit human approval — enforced at the agent boundary level, not just the MCP level
- All actions logged with agent identity for audit trail
- Script execution limited to a pre-approved script library — agents cannot upload or execute arbitrary scripts
- Device inventory queries must be scoped to the requesting client's tenant (no cross-tenant device access)

## Integration Points

- **Infrastructure agents** (`linux`, `cpanel`) — Correlate CLI diagnostics with RMM device records
- **PSA/Ticketing MCP** — Create tickets from RMM alerts, link device context to tickets
- **Fleet Dashboard** — Log all RMM interactions as agent activity
- **Guardian agents** — Alert anomaly detection (unusual alert volumes, unexpected device states)
- **n8n workflows** — Trigger agent actions on RMM alert webhooks

## Open Questions

1. How do we handle the "pre-approved script library" — should it be a Git-tracked directory of scripts, or a reference to scripts already uploaded in the RMM platform?
2. Should device metrics be pulled on-demand or cached/aggregated by an intermediary?
3. What is the cross-platform device identifier strategy when a client uses multiple RMM tools (migration scenario)?
