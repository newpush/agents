# Agent Development & Refinement

## 1. How to Use the Agents

Agents in Project NoeMI are defined as Markdown personas (e.g., `agents/marketing/brand-strategist.md`). To utilize an agent effectively:

1.  **Load the Persona:** Point your orchestrator (like Gemini CLI, n8n, or a custom chat application) to the specific agent file. The orchestrator must adopt the agent's defined **Role, Tone, and Rules** as its primary system prompt.
2.  **Inject the Tools:** Use `scripts/generate_gemini.js` in combination with your `mcp.config.json` to inject *only* the necessary MCP protocols into the agent's context window. Do not overwhelm a specialized agent with tools it does not need.
3.  **Execute:** Provide the agent with a targeted task that aligns perfectly with its capabilities. 

## 2. Continuous Refinement & Feedback Loops

Agents are never "finished." They require continuous refinement based on real-world execution and alignment with the **4D Framework** (specifically the *Description* and *Discernment* pillars).

*   **Human-in-the-Loop (HITL) Feedback:** Establish a process where human operators review agent outputs (especially during the "Delegation" phase). Use this feedback to explicitly update the agent's Rules & Constraints.
*   **Prompt Optimization:** If an agent hallucinates or steps out of bounds, *do not just correct the output*. You must correct the root cause: the persona file. Add a strict, explicit negative constraint (e.g., "NEVER invent pricing data; only read from the Pricing Document").
*   **Log Review:** Regularly review the transcripts of the agent's interactions with MCP tools to identify inefficient reasoning or repetitive tool calls.

## 3. Version Control Integration

Agent personas are the source code of your synthetic workforce. Treat them with the same rigor as traditional software:

*   **Branching Strategy:** Create feature branches for persona tweaks (e.g., `feature/refine-qa-manager-prompts` or `fix/brand-strategist-tone`).
*   **Peer Review:** Require Pull Requests (PRs) for changes to agent rules or MCP capabilities. Another engineer (or the "AI Architect" persona) must review the PR to ensure the changes do not violate TRiSM standards or the 4D Framework.
*   **Semantic Versioning:** Tag releases of the agent repository (e.g., `v1.2.0`) to maintain stable, known versions of personas for production environments, preventing sudden behavioral drift.

## 4. Best Practices

*   **Modularity over Monoliths:** Keep personas focused. If an agent's instruction file becomes too large or its capabilities too broad, split it into two specialized agents and have them collaborate.
*   **Traceability:** Always explicitly require agents to cite their sources when retrieving data via MCPs. This is critical for the *Diligence* pillar.
*   **Context Management:** Regularly review `mcp.config.json` for each deployment to ensure you are not passing unnecessary MCP schemas to the LLM, which wastes tokens and degrades performance.