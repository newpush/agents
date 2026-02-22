# NewPush Agents Repository - Requirements

## Overview
This repository serves as a comprehensive resource for agentic development and a ready-to-use toolkit for building AI agents. It functions as the central directory for Project NoeMI, housing agent personas, specialized workflows, domain-specific knowledge (Markdown documentation), and integration scripts. 

The primary goal is to provide a robust foundation that developers can use to quickly scaffold, configure, and deploy intelligent agents, while also providing a suite of "out-of-the-box" agents ready for immediate use.

## Core Objectives
1. **Agentic Development Toolkit**: Provide reusable components, standardized persona definitions (e.g., Support Helper, Infrastructure Engineer), and workflow templates to accelerate agent creation.
2. **Out-of-the-Box Agents**: Supply fully defined, operational agent personas that can be deployed immediately for common tasks across coding, communication, engineering, infrastructure, marketing, operations, and product domains.
3. **Knowledge Base**: Act as a structured repository of information, protocols, and best practices that guide both human developers and the AI agents (NoeMI) operating within the ecosystem.

## Functional Requirements
1. **Persona Definition**: Agents must be defined clearly using Markdown specifications (located in the `agents/` directory) dictating their Role, Tone, Capabilities, and Rules.
2. **Configuration**: Agent runtime execution must be configurable via environment variables (for sensitive secrets) and `mcp.config.json` (for standard configuration like active MCP integrations).
3. **Extensibility (MCP Integration)**: Agents and the underlying toolkit utilize the Model Context Protocol (MCP) to dynamically discover and interact with tools provided by external servers (e.g., WHMCS MCP, n8n MCP).
4. **Modular Context Generation**: The system must provide a mechanism to compile `GEMINI.md` dynamically from base templates and modular MCP protocol files. This prevents context window overloading and allows developers to selectively activate only the MCP integrations relevant to their current task.

## Operational & Security Requirements
1. **Execution Environment**: Agents defined in this repository can be executed as standalone scripts via CLI, or integrated into broader orchestration systems and chat UIs.
2. **Security & Credentials (Fetch-on-Demand)**: The toolkit mandates a "Fetch-on-Demand" architecture for secrets. All sensitive credentials (e.g., API keys, MCP connection strings) must be stored exclusively in secure vaults (e.g., 1Password) and never hardcoded.
3. **Runtime Resolution**: Secrets must be resolved dynamically at runtime using secure CLI tools (e.g., the 1Password CLI `op`).
4. **Resilience**: Agents built with this toolkit must handle tool execution and API failures gracefully, reporting issues clearly while logging technical details for debugging.
5. **Standardized Logging**: Agent scripts must implement structured logging to `stdout` and `stderr` to facilitate monitoring and troubleshooting in various execution environments.

## Technical Specifications
- **Architecture**: A hybrid structure containing static Markdown documentation (for knowledge and persona definition) and executable scripts/configurations for runtime deployment.
- **Authentication & Access Control**: The toolkit does not implement internal authentication or Role-Based Access Control (RBAC). These concerns are delegated to the execution environment (e.g., CLI, 1Password, or the host chat platform).
- **Data Persistence**: Agents operate with stateless execution. No dedicated database is required; all state and configuration are injected at runtime or managed via external systems.