# Project NoéMI Agents Repository - Requirements

## Overview
This repository serves as a comprehensive resource for agentic development and a ready-to-use toolkit for building AI agents. It functions as the central directory for Project NoéMI, housing agent personas, specialized workflows, domain-specific knowledge (Markdown documentation), and integration scripts.

The primary goal is to provide a robust foundation that developers can use to quickly scaffold, configure, and deploy intelligent agents, while also providing a suite of "out-of-the-box" agents ready for immediate use by external orchestrators.

### Agent Deployment Model
- **Standalone Collection**: This repository is exclusively a collection of standalone AI agent definitions, context templates, and scripts.
- **External Dependencies**: Specific agents are implemented as personas that rely on external tools, such as Model Context Protocol (MCP) servers, for their core functionality rather than hosting that logic locally. Execution is handled by external orchestrators (e.g., Gemini CLI, n8n).

## Core Objectives
1. **Agentic Development Toolkit**: Provide reusable components, standardized persona definitions, and workflow templates to accelerate agent creation.
2. **Out-of-the-Box Agents**: Supply fully defined, operational agent personas that can be deployed immediately for common tasks across coding, infrastructure, communication, engineering, marketing, operations, and product domains. Documentation strictly mirrors these directories in `docs/agents/`.
3. **Knowledge Base**: Act as a structured repository of information, protocols, and best practices that guide both human developers and the AI agents (NoéMI) operating within the ecosystem.

## Functional Requirements
1. **Persona Definition**: Agents must be defined clearly using Markdown specifications (located in the `agents/` directory). The standard format for specialized agents is "Role, Mission, Core Mandates, Workflow, Boundaries".
2. **Configuration**: Agent runtime execution is configured via the orchestrator's environment variables. The context assembly script uses `mcp.config.json` to generate the correct base templates. 
3. **Extensibility (MCP Integration)**: Agents and the underlying toolkit must be capable of seamlessly interacting with external Model Context Protocol (MCP) servers to expand their capabilities and execute actions in external systems.
4. **Modular Context Generation**: The system must provide a mechanism to compile `GEMINI.md` dynamically from base templates and modular MCP protocol files. This prevents context window overloading and allows developers to selectively activate only the MCP integrations relevant to their current task.

## Operational & Security Requirements
1. **Execution Environment**: Agents defined in this repository are executed by integration into broader orchestration systems and chat UIs (e.g. Gemini CLI, LangChain).
2. **Security & Credentials (Fetch-on-Demand)**: The toolkit mandates a "Fetch-on-Demand" architecture for secrets (referencing `.env.template`). All sensitive credentials (e.g., API keys, MCP connection strings) must be stored exclusively in secure vaults (e.g., 1Password) and never hardcoded.
3. **Runtime Resolution**: Secrets must be resolved dynamically at runtime using secure CLI tools (e.g., the 1Password CLI `op`).
4. **Resilience & Logging**: Agents must handle tool execution and API failures gracefully. Standardized logging to `stdout` and `stderr` is handled by the execution platform/orchestrator.
5. **Identity & Access Management**:
    - **Authentication**: Delegated to the environment executing the agent (e.g., 1Password CLI auth for local runs).
    - **RBAC**: Role-Based Access Control is handled by the execution platform or host interface.
    - **Auditing**: Audit logging of tool executions is the responsibility of the MCP servers or the orchestrating platform.

## Technical Specifications
- **Architecture**: A hybrid structure containing static Markdown documentation (for knowledge and persona definition) and Node.js executable scripts/configurations for runtime context deployment.
- **Data Persistence**: The core execution model is stateless execution. Persistent memory (e.g., pgvector Memory Layer) is an optional enhancement handled by advanced orchestrators.
- **Runtime Environment**: The context generation scripts use a Node.js environment. Docker and Gemini CLI are required dependencies for running the local examples and pre-flight checks.
