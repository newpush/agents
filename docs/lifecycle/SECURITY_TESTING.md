# Security, Testing, & Quality Assurance

## 1. Testing Protocols

Testing non-deterministic AI agents requires a fundamentally different approach than traditional unit testing. A multi-layered strategy is mandatory.

*   **Prompt Unit Testing (LLM-as-a-Judge):** Run the agent persona through a suite of standard input prompts. Use a separate, highly configured LLM to programmatically evaluate the output, ensuring the specified Tone, Role, and Rules are strictly respected.
*   **Integration Testing (Mock MCPs):** Spin up mock MCP servers that return static, predictable JSON responses. Verify that the agent correctly formats its tool calls, parses the mock responses accurately, and takes the appropriate subsequent actions.
*   **Continuous Evaluation:** Periodically test production agents against a "golden dataset" of ideal interactions. This helps detect "persona drift" that can occur silently when underlying base LLM models (e.g., GPT-4, Claude 3, Gemini) receive updates from their providers.

## 2. Security Hardening

Security must align strictly with the **Gartner AI TRiSM** standards and the *Diligence* pillar of the 4D Framework.

*   **Least Privilege MCPs:** If an agent (e.g., the Knowledge Manager) only needs to *read* Google Docs, its configured MCP server MUST NOT be granted write permissions at the API level.
*   **Human-in-the-Loop (HITL):** Enforce hard blocks within the orchestrator for any mutating actions (e.g., sending emails, deleting files, executing SQL `UPDATE` statements, pushing code). The agent must draft the action and explicitly await human confirmation before execution.
*   **Prompt Injection Defense:** Design orchestrators to sanitize user inputs before passing them to the agent. Furthermore, explicitly instruct the agent within its persona file to recognize and reject instructions that attempt to override its primary Role or Rules.

## 3. User Access Control (RBAC)

Agents do not handle their own authentication. Security boundaries must be enforced at the orchestration and infrastructure levels.

*   **Orchestrator Level Authorization:** The system running the agent (e.g., a chat UI, CLI, or workflow engine) must enforce Role-Based Access Control (RBAC). A standard user should not be able to invoke the "AI Architect" agent if they do not have the required permissions.
*   **Identity Propagation:** Whenever possible, the orchestrator should pass the authenticated human user's identity through to the MCP server (e.g., via OAuth tokens or scoped API keys). This ensures the agent acts strictly within the permission boundaries of the human requesting the action, preventing privilege escalation.

## 4. Red Teaming

As mandated by `docs/GOVERNANCE.md`, all agents must undergo a simulated Red Team audit before deployment. This involves intentionally attacking the agent to uncover vulnerabilities, test boundary constraints, and ensure it fails securely.