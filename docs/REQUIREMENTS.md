# NewPush Agents Repository - Requirements

## Overview
This repository serves as a comprehensive resource for agentic development and a ready-to-use toolkit for building AI agents. It functions as the central directory for Project NoéMI, housing agent personas, specialized workflows, domain-specific knowledge (Markdown documentation), and integration scripts.

The primary goal is to provide a robust foundation that developers can use to quickly scaffold, configure, and deploy intelligent agents, while also providing a suite of "out-of-the-box" agents ready for immediate use.

### Agent Deployment Model
- **Standalone Collection**: This repository is exclusively a collection of standalone AI agents and scripts.
- **External Dependencies**: Specific agents (e.g., [PENDING] "Support Helper") are implemented as personas that rely on external tools, such as a [PENDING] WHMCS Model Context Protocol (MCP) server, for their core functionality rather than hosting that logic locally.

## Core Objectives
1. **Agentic Development Toolkit**: Provide reusable components, standardized persona definitions (e.g., [PENDING] Support Helper, Infrastructure Engineer), and workflow templates to accelerate agent creation.
2. **Out-of-the-Box Agents**: Supply fully defined, operational agent personas that can be deployed immediately for common tasks across coding, infrastructure, communication, engineering, marketing, operations, and product domains. [PENDING] Documentation mirroring drift identified; `docs/agents/` is missing directories for `engineering`, `marketing`, `operations`, and `communication`.
3. **Knowledge Base**: Act as a structured repository of information, protocols, and best practices that guide both human developers and the AI agents (NoéMI) operating within the ecosystem.

## Functional Requirements
1. **Persona Definition**: Agents must be defined clearly using Markdown specifications (located in the `agents/` directory) dictating their Role, Tone, Capabilities, and Rules. [PENDING] Implementation drift identified in specialized coding agents (Bolt, Sentinel) which utilize a divergent template (Mission, Mandates, Workflow) and refer to external tooling (`pnpm`, `npm test`) not present in this repository.
2. **Configuration**: [PENDING] Agent runtime execution must be configurable entirely via environment variables (e.g., `ACTIVE_MCPS`, `APP_ENV`).
3. **Extensibility (MCP Integration)**: Agents and the underlying toolkit must be capable of seamlessly interacting with external Model Context Protocol (MCP) servers (e.g., WHMCS MCP, n8n MCP) to expand their capabilities and execute actions in external systems.
4. **Modular Context Generation**: The system must provide a mechanism to compile `GEMINI.md` dynamically from base templates and modular MCP protocol files. This prevents context window overloading and allows developers to selectively activate only the MCP integrations relevant to their current task.

## Operational & Security Requirements
1. **Execution Environment**: Agents defined in this repository can be executed as standalone scripts via CLI, or integrated into broader orchestration systems and chat UIs.
2. **Security & Credentials (Fetch-on-Demand)**: [PENDING] The toolkit mandates a "Fetch-on-Demand" architecture for secrets (referencing a missing `.env.template`). All sensitive credentials (e.g., API keys, MCP connection strings) must be stored exclusively in secure vaults (e.g., 1Password) and never hardcoded.
3. **Runtime Resolution**: Secrets must be resolved dynamically at runtime using secure CLI tools (e.g., the 1Password CLI `op`).
4. **Resilience & Logging**: Agents must handle tool execution and API failures gracefully. Technical details must be logged using [PENDING] standardized logging to `stdout` and `stderr`.
5. **Identity & Access Management**:
    - **Authentication**: Delegated to the environment executing the agent (e.g., 1Password CLI auth for local runs).
    - **RBAC**: Role-Based Access Control is handled by the execution platform or host interface.
    - **Auditing**: Audit logging of tool executions is the responsibility of the MCP servers or the orchestrating platform.

## Technical Specifications
- **Architecture**: A hybrid structure containing static Markdown documentation (for knowledge and persona definition) and executable scripts/configurations for runtime deployment.
- **Data Persistence**: [PENDING] Contradiction identified between "Stateless Execution" mandate and the inclusion of a `pgvector` "Memory Layer" in `examples/docker/docker-compose.yml`.
- **Runtime Environment**: [PENDING] Agents are designed for cross-platform compatibility, primarily utilizing Node.js or Python environments. Core dependencies identified in `verify-env.sh` include `Node.js`, `Python3`, `Docker`, and the `Gemini CLI`.
