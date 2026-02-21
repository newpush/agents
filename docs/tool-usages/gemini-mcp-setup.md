# Gemini CLI - Modular MCP Setup Guide

This guide explains how to use the Modular Model Context Protocol (MCP) system within the NewPush Agents Repository.

## 🌟 The Concept: Why Modular Context?

When working with an AI agent like Gemini CLI, providing too much system context (instructions on how to behave) can lead to:
1.  **Token Bloat:** Wasting token limits on instructions the agent doesn't need for the current task.
2.  **Hallucinations/Distraction:** An agent might try to use a tool or follow a rule meant for a completely different system.

To solve this, Project NoeMI utilizes a **Modular Context Generation** system. Instead of one massive `GEMINI.md` file containing rules for every possible tool, we dynamically build `GEMINI.md` based *only* on the tools the agent needs right now.

---

## ⚙️ How it Works

The system relies on three components:

1.  **`GEMINI.template.md`**: The base persona and repository rules.
2.  **`mcp-protocols/` Directory**: Contains granular Markdown files, each defining the rules for a single MCP service (e.g., `slack.md`, `gmail.md`, `google-sheets.md`).
3.  **`mcp.config.json`**: The configuration file where you declare which MCPs to activate.
4.  **`scripts/generate_gemini.js`**: The build script that merges the base template with the selected protocols.

---

## 🔌 Connecting Official Google MCP Servers

Before generating instructions for the agent via `GEMINI.md`, the actual underlying tools must be available to your Gemini CLI. 

Google provides an official Workspace extension specifically designed for Gemini CLI (found at the `gemini-cli-extensions/workspace` repository on GitHub) which seamlessly integrates using your Google account.

**To enable the official Google Workspace MCP Server in your CLI:**
Run the following command in your terminal. This registers the server (which includes Gmail, Drive, Docs, Calendar, etc.) and will prompt you to securely log in to your Google account:
```bash
gemini extensions install https://github.com/gemini-cli-extensions/workspace
```

> **⚠️ Installation Warning Notice**
> When running the command above, Gemini CLI will display the following warning:
> *"The extension you are about to install may have been created by a third-party developer and sourced from a public repository. Google does not vet, endorse, or guarantee the functionality or security of extensions. Please carefully inspect any extension and its source code before installing to understand the permissions it requires and the actions it may perform."*
>
> **This is normal and expected.** The CLI is designed with a "trust no one by default" security model. It requires you to acknowledge the risk of running code that can access personal data (emails, docs, etc.) because the code is sourced directly from a GitHub URL rather than a pre-compiled, locked-down binary.

*Note: Once the server is connected, you do NOT want to overwhelm the AI with all the rules for every Google app. That is why we use the modular setup below to inject only the instructions relevant to the agent's current persona!*

---

## 🛠️ Step-by-Step Setup

### Step 1: Define Your Active MCPs
Open the `mcp.config.json` file in the root of the repository. Update the `active_mcps` array to include the exact filenames (without the `.md` extension) of the protocols you need from the `mcp-protocols/` folder.

**Example 1: The "Support Helper" Agent**
This agent only needs to read Google Docs for knowledge and send Slack messages.
```json
{
  "active_mcps": [
    "google-docs",
    "slack"
  ]
}
```

**Example 2: The "Executive Assistant" Agent**
This agent handles email, calendar scheduling, and organizing Drive folders.
```json
{
  "active_mcps": [
    "gmail",
    "google-calendar",
    "google-drive"
  ]
}
```

**Example 3: The "Automation Engineer" Agent**
This agent builds workflows and needs access to n8n and Google Sheets for data mapping.
```json
{
  "active_mcps": [
    "n8n",
    "google-sheets"
  ]
}
```

### Step 2: Generate the Context File
Once your `mcp.config.json` is configured, run the generation script from your terminal:

```bash
node scripts/generate_gemini.js
```

**What happens?**
The script will output:
```text
Generating modular GEMINI.md...
Injecting module: gmail
Injecting module: google-calendar
Injecting module: google-drive
Successfully generated GEMINI.md with active integrations: gmail, google-calendar, google-drive
```
A new `GEMINI.md` file is instantly created (or overwritten) in the root directory. It now contains the core repository rules *plus* the specific instructions for Gmail, Calendar, and Drive appended to the bottom.

### Step 3: Start Gemini
You are now ready to start your Gemini CLI session. Because `GEMINI.md` is automatically read by the CLI on startup, the agent will instantly possess the highly focused, token-efficient context needed to execute the requested persona flawlessly.

---

## 🧠 Strategies for Token Efficiency (Large Datasets)

When your agent needs to process massive amounts of information—like searching through hundreds of emails or reading a massive spreadsheet—it is crucial to employ token-efficient strategies to prevent overwhelming the context window.

### 1. Targeted Filtering & Search
Never ask an agent to "Read all emails from this week." Instead, enforce the use of strict search operators within the MCP tools.
*   **Inefficient:** Fetching all recent emails and having the AI sift through them.
*   **Efficient:** Utilizing Gmail search syntax in the tool call: `from:boss@example.com subject:"Q3 Report" newer_than:2d`.

### 2. Metadata Before Body (The Two-Step Approach)
When processing emails or large documents, instruct the agent to fetch *only* the metadata first, and then fetch the full body of only the relevant items.
*   **Step 1:** "List the subjects, senders, and IDs of the last 20 emails."
*   **Step 2:** "Now, fetch the full body content for email ID `12345`."

### 3. Pagination & Chunking
If an agent must read a large dataset, ensure the tool calls utilize `limit` and `offset` (or pagination token) parameters.
*   "Fetch the first 10 responses from the form. Analyze them, then fetch the next 10."

### 4. Targeted Extraction
If the external MCP server supports server-side extraction or summarization, rely on that instead of piping raw data back to Gemini. Alternatively, ask the tool to return only the specific fields you care about (e.g., just the `amount` column from a spreadsheet) rather than the entire row object.

---

## 📚 Available MCP Protocols

As of the current version, the following protocols are available in the `mcp-protocols/` directory and can be used in `mcp.config.json`:

*   `n8n`
*   `slack`
*   `gmail`
*   `google-admin`
*   `google-calendar`
*   `google-chat`
*   `google-contacts`
*   `google-docs`
*   `google-drive`
*   `google-forms`
*   `google-keep`
*   `google-meet`
*   `google-sheets`
*   `google-slides`

*To add a new protocol, simply create a new `.md` file in the `mcp-protocols/` directory detailing the specific rules and instructions for that tool.*