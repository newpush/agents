# Deployment & CI/CD

## 1. Putting Agents into Production

Moving an agent from local development (e.g., a CLI environment) to production involves transitioning to a managed orchestrator or automated pipeline.

*   **Stateless Execution:** Ensure the agent relies entirely on injected context (`GEMINI.md`) and external MCP servers. The agent itself must hold no local file state.
*   **Orchestration Platforms:** Deploy agents within robust frameworks (e.g., n8n, dedicated chat UIs, or automated cron jobs) that can handle API rate limits, network retries, and session memory management.

## 2. Scheduling & Autonomous Triggers

Because the agents defined in this repository are stateless configurations (Markdown personas and JSON configs), **scheduling is fundamentally the responsibility of the Orchestration Platform**, not the agent's code itself. 

To schedule an agent to run autonomously without human conversation, deploy them using one of the following methods:

*   **Workflow Engines (Recommended):** Platforms like **n8n** or **Apache Airflow** are ideal. You can use a Schedule Trigger node to wake up the agent (e.g., the "Knowledge Manager") every night at 2:00 AM, pass it a predefined prompt ("Review today's Google Drive uploads and summarize them"), and let it use its MCP integrations to complete the task.
*   **Cron Jobs / Serverless Functions:** For simpler agents, package the LLM execution script (like a Python or Node.js wrapper that reads the `GEMINI.md` context) into an AWS Lambda, Google Cloud Function, or Kubernetes CronJob. Configure the cloud provider's scheduler to trigger the function at specific intervals.
*   **Event-Driven Triggers:** Instead of time-based scheduling, trigger agents based on events. For example, configure a webhook so that every time a new Jira ticket is created, the "QA & Risk Manager" agent is instantly triggered to review it via an MCP integration.

## 3. Deployment Strategies

Deploying AI models carries unique risks (like prompt drift or hallucination). Use phased rollout strategies:

*   **Canary Releases:** Roll out an updated agent persona to a small, controlled subset of workflows or internal users before full organizational deployment. Monitor error rates and token usage closely.
*   **Shadow Mode:** Run a new agent persona in parallel with an existing one. Log its proposed actions and tool calls without actually executing them (especially mutating MCP actions). Compare its performance against the stable version before promoting it to active duty.

## 4. Configuration Management & Environment Provisioning

*   **Dynamic Context Generation:** Use the `scripts/generate_gemini.js` tool to build environment-specific context files dynamically during the deployment phase, driven by the environment's specific `mcp.config.json`.
*   **Secret Management (Fetch-on-Demand):** Production environments must use automated vault retrieval (e.g., 1Password CLI `op run`, AWS Secret Manager, or Kubernetes Secrets). **Never** bake API keys or MCP connection strings into Docker images or environment files.
*   **Containerization:** Package the orchestration script, the generated context files, and the necessary MCP client libraries into a standardized Docker container to guarantee consistent environment provisioning across staging and production.

## 5. CI/CD Pipeline Integration

Integrate agent deployments into standard CI/CD pipelines (e.g., GitHub Actions, GitLab CI):

1.  **Linting:** Verify the Markdown formatting of persona files and validate the JSON structure of `mcp.config.json`.
2.  **Context Build:** Run `node scripts/generate_gemini.js` as a mandatory build step to assemble the final system prompt.
3.  **Automated Testing:** Execute prompt evaluation and integration tests (see [Security & Testing](SECURITY_TESTING.md)) against the new persona.
4.  **Deployment Push:** Push the updated configuration and context files to the production orchestrator or container registry.

## 6. Rollback Procedures

Because Project NoeMI agents are stateless and entirely configuration-driven, rollbacks should be nearly instantaneous:

1.  **Revert:** Revert the Git commit containing the problematic persona or configuration change.
2.  **Rebuild:** Trigger the CI/CD pipeline to rebuild and redeploy the previous, stable context file.
3.  **Flush Caches:** Flush any prompt or session caches in the production orchestrator to ensure the old, stable persona is loaded into memory immediately for all new interactions.