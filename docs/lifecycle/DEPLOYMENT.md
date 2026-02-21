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
*   **Event-Driven Triggers:** Instead of time-based scheduling, trigger agents based on events. Rather than having the agent poll for data, the orchestrator listens for an event and pushes the context to the agent.

#### Concrete Example 1: Slack Mention Trigger (Node.js / Express Webhook)
When a user mentions the agent in Slack, the Slack Event API sends a payload to your orchestrator webhook. The orchestrator parses the message, loads the agent context, and passes it to the LLM via the MCP server connection.

```javascript
// Express.js Webhook Endpoint for Slack
app.post('/slack/events', async (req, res) => {
  const { type, event } = req.body;

  // Slack URL Verification Challenge
  if (type === 'url_verification') return res.send(req.body.challenge);

  // Trigger on app_mention
  if (event && event.type === 'app_mention') {
    res.sendStatus(200); // Acknowledge Slack immediately

    const userMessage = event.text.replace(/<@U[A-Z0-9]+>/g, '').trim(); // Remove bot tag
    
    // 1. Load the specific Agent Persona (e.g., Knowledge Manager)
    const systemPrompt = fs.readFileSync('./GEMINI.md', 'utf8');

    // 2. Execute the Agent (Pseudocode for LLM invocation with MCP context)
    const agentResponse = await executeLLM({
      systemPrompt: systemPrompt,
      prompt: `User asked: ${userMessage}. Use your MCP tools to find the answer.`,
      active_mcps: ['slack', 'google-docs']
    });

    // 3. Post result back to Slack thread
    await slackClient.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: agentResponse
    });
  }
});
```

#### Concrete Example 2: Gmail New Email Trigger (n8n Workflow)
Instead of writing custom webhook code, you can use a visual orchestrator like n8n. This is the recommended approach for integrating with Gmail due to complex OAuth flows.

**n8n Workflow JSON Snippet:**
```json
{
  "nodes": [
    {
      "parameters": {
        "pollTimes": {
          "item": [ { "mode": "everyMinute" } ]
        },
        "filters": {
          "labelIds": ["INBOX", "UNREAD"],
          "q": "subject:\"Urgent Client Request\""
        }
      },
      "id": "1",
      "name": "Gmail Trigger",
      "type": "n8n-nodes-base.gmailTrigger",
      "typeVersion": 1,
      "position": [ 250, 300 ]
    },
    {
      "parameters": {
        "model": "gemini-1.5-pro",
        "systemMessage": "=# You are the QA & Risk Manager...\n\n{{ $fs.readFile('/path/to/repo/agents/GEMINI.md') }}",
        "messages": {
          "messageValues": [
            {
              "message": "=Analyze the following urgent email and draft a risk assessment: \nSubject: {{ $json.snippet }}\nBody: {{ $json.textPlain }}"
            }
          ]
        }
      },
      "id": "2",
      "name": "Execute Agent (Gemini)",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1,
      "position": [ 450, 300 ]
    }
  ],
  "connections": {
    "Gmail Trigger": {
      "main": [ [ { "node": "Execute Agent (Gemini)", "type": "main", "index": 0 } ] ]
    }
  }
}
```
In this n8n example, the workflow automatically watches the Gmail inbox. When a matching email arrives, it reads the `GEMINI.md` context file from the filesystem, injects the email contents into the prompt, and executes the AI Architect or QA Risk Manager persona, completely autonomously.

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