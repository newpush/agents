# The 4D Framework: Diligence

## 1. The Core Principle
Diligence focuses on the ethical, financial, and operational reality of deploying AI. An AI that isn't integrated is just a toy; an AI that isn't ethical or governed is a liability.

## 2. Integration and Return on Investment (ROI)
- **Creation Diligence**: Ensuring the build respects intellectual property, bias mitigation, and data privacy.
- **Deployment Diligence**: Calculating the ROI, managing the transition from a "Walled Garden" prototype to "Deep Integration" (where the AI lives inside the ERP/CRM), and establishing CI/CD pipelines.

## 3. The Diligence Process (High-Tech Surfboard Model)
- **Explorers (Passengers)**: Act as the "Board of Directors." They judge the business case, asking if the automation actually saves time and creates value.
- **Practitioners (Crew)**: Act as "System Integrators." They map how the agent connects to the real world (e.g., configuring the webhook that sends the actual email vs. just drafting it).
- **Accelerators (Pilots)**: Act as the "Risk Officer." They present the ROI calculations (Time Saved x Labor Cost) and define the "Correction Plan" (What happens if the AI fails in production?). They also oversee the academic and security validation (The Feynman Requirement).

## 4. Putting Agents into Production
Moving an agent from local development to production involves transitioning to a managed orchestrator or automated pipeline.
*   **Stateless Execution:** Ensure the agent relies entirely on injected context (`GEMINI.md`) and external MCP servers.
*   **Orchestration Platforms:** Deploy agents within robust frameworks (e.g., n8n, dedicated chat UIs) that handle API rate limits and network retries.

## 5. Deployment Strategies & CI/CD
Deploying AI models carries unique risks like prompt drift or hallucination.
*   **Canary Releases:** Roll out an updated agent persona to a small, controlled subset of workflows. Monitor error rates and token usage closely.
*   **Shadow Mode:** Run a new agent persona in parallel with an existing one. Log its proposed actions without executing them to compare performance against the stable version.
*   **CI/CD Integration:** Integrate agent deployments into standard CI/CD pipelines (Linting, Context Build, Automated Testing, Deployment Push).
*   **Rollback Procedures:** Because agents are stateless, rollbacks involve reverting the Git commit, rebuilding, and flushing caches.

## 6. Operations, Monitoring, & Reliability
Agents operate probabilistically, meaning strict observability is required.
*   **Token Usage Tracking:** Continuously monitor prompt and completion tokens per agent to forecast costs and identify inefficient loops.
*   **MCP Latency Metrics:** Log the response times of all external MCP servers. Slow tools cause timeouts.
*   **Incident Response:** Maintain runbooks for common failures, such as a "Hallucination Cascade" (disable write-access MCPs, revert persona) or "MCP Server Downtime" (orchestrator gracefully informs the agent).