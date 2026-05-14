# NewPush Labs — What It Is and When to Use It

**NewPush Labs** (`labs.newpush.com`) is a pre-configured, ready-to-run appliance for experimenting with the NewPush open-source stack. It is a **lab and playground environment** — not a production-grade, mission-critical platform.

Purchase and tier options: [mikrovps.net/vps/labs](https://mikrovps.net/vps/labs)

---

## What NewPush Labs Is For

Use the Labs appliance when you need to:

- **Explore and learn** the NewPush stack without setting up infrastructure from scratch
- **Prototype** new n8n workflows, agent personas, and automation ideas quickly
- **Run training exercises** — all NoéMI Layer B (Dynamic Labs) curriculum exercises are designed for this environment
- **Validate a concept** before committing it to a production cluster
- **Test integrations** with external APIs, credentials, and tools in a contained environment
- **Experiment freely** — break things, rebuild, iterate without consequence

The Labs appliance is intentionally low-friction. It is pre-installed, pre-configured, and available within minutes. That speed and convenience is the point.

---

## What NewPush Labs Is NOT For

Do **not** use the Labs appliance for:

| Scenario | Why not |
|---|---|
| Production AI agent workflows serving real users | No SLA, not hardened for uptime |
| Mission-critical automation (billing, operations, customer-facing) | Not designed for reliability guarantees |
| Storing real credentials, API keys, or production secrets | Treat all Labs credentials as non-production |
| Long-term workflow storage | Labs environments may be reset; workflows are not persisted across cohorts |
| Regulated or sensitive data processing | GDPR, HIPAA, and similar compliance requirements demand dedicated infrastructure |

The Labs appliance is a **learning and prototyping surface**. Anything that has a business impact if it goes down or leaks data belongs on a purpose-built production cluster.

---

## Hardware Tiers

| Tier | Storage | RAM | vCPU | Best for |
|---|---|---|---|---|
| **Labs S** | 40 GB SSD | 4 GB | 2 | Individual exploration, solo learning |
| **Labs M** | 100 GB SSD | 8 GB | 4 | Team exercises, cohort labs *(most popular)* |
| **Labs L** | 150 GB SSD | 16 GB | 6 | Multi-agent prototyping, heavier stacks |
| **Labs XL** | 200 GB SSD | 32 GB | 8 | Full fleet simulation, accelerator-led cohorts |

---

## What Comes Pre-Installed

Every Labs tier ships with the full NewPush open-source stack:

| Component | Role |
|---|---|
| **n8n** | Workflow automation and AI agent orchestration |
| **Casdoor** | Single Sign-On (SSO) / Identity Provider |
| **Traefik** | Ingress controller with automatic SSL certificates |
| **Grafana** | Dashboards — token usage, error rates, agent performance |
| **Loki** | Log aggregation — captures agent inputs and outputs |
| **Portainer** | Container lifecycle management and deployment templates |
| **Web terminal** | Browser-based shell access, no SSH client required |

Infrastructure is defined via Ansible, so the entire stack is reproducible and version-controlled.

---

## LABS vs. Production: Where Things Go

The decision is straightforward: **if it matters, it does not belong on Labs.**

| | **NewPush Labs** | **Production N8N Cluster** |
|---|---|---|
| **Purpose** | Learning, prototyping, testing | Live operations, business automation |
| **Availability** | Best-effort | Managed SLA |
| **Credentials** | Test/mock only | Real, vault-managed secrets |
| **Workflow persistence** | Temporary | Long-term, version-controlled |
| **Data sensitivity** | Non-sensitive only | Governed by client security policy |
| **Who manages it** | Participant / builder | NewPush (hosted) or client IT |
| **Reset policy** | May be wiped between cohorts | Never wiped without explicit request |

### The promotion path

```
LABS (prototype) → peer review → PROD cluster (activate)
```

Workflows graduate from Labs to production only after:

1. Logic and error handling are validated end-to-end in Labs
2. All placeholder credentials are replaced with vault-managed production secrets
3. A human approver has reviewed the workflow scope and authorized activation

---

## Production Clusters

For mission-critical automation, NewPush provides **purpose-based hosted n8n clusters** — isolated, protected, and managed. These are separate from the Labs appliance and are provisioned per client or per use case.

Contact NewPush to provision a production cluster when:
- A workflow moves from prototype to live business operation
- The automation handles customer data, financial transactions, or regulated information
- Uptime and audit logging are required

---

## Credential Handling on Labs

- **Never store production API keys or OAuth tokens on the Labs appliance.**
- Use test accounts, sandbox API keys, and mock endpoints during Labs work.
- When a workflow is ready to promote, credentials are migrated into Infisical (or the client's vault) and injected into the production cluster — they are never copied from Labs directly.

---

## Related Documentation

- [n8n MCP Setup](../mcp-setup/n8n.md) — connecting an agent runtime to an n8n instance
- [Secure Secret Management](secure-secret-management.md) — vault patterns for production credentials
- [Fleet Deployment](../../examples/fleet-deployment/docker-compose.yml) — per-cohort n8n isolation architecture
- [Technology Stack Overview](../PROJECT_REFERENCE.md#chapter-12-the-technology-stack-concept) — stack principles and component descriptions
