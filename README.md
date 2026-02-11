# NewPush Agents Library

This repository serves as the central library for NewPush AI agent specifications, documentation, and shared tool usages. It is designed to be scalable, supporting a nested hierarchy of specialized agents.

## 📦 Repository Structure

The repository is organized into two primary directories that mirror each other:

1.  **`agents/`**: Contains the **Agent Specifications** (the "source code" or prompt definitions of the agents).
2.  **`docs/`**: Contains supporting documentation, manuals, and tool usage guides.

### Structure Rules

*   **Nesting:** Agents can be organized into nested folders (e.g., `infrastructure/linux`).
*   **Mirroring:** The `docs/agents/` directory **must** strictly mirror the structure of the `agents/` directory.
    *   If an agent spec exists at `agents/category/agent-name.md`...
    *   ...its documentation must be located at `docs/agents/category/agent-name/`.

### Example Hierarchy

```text
.
├── agents/                       # Agent Specifications
│   ├── infrastructure/
│   │   ├── linux.md              # Spec for Linux Agent
│   │   └── cpanel.md             # Spec for cPanel Agent
│   └── marketing/
│       └── social-media.md       # Spec for Social Media Agent
│
├── docs/                         # Documentation
│   ├── agents/                   # Agent-specific Docs (Mirrors agents/)
│   │   ├── infrastructure/
│   │   │   ├── linux/            # Docs for Linux Agent
│   │   │   └── cpanel/           # Docs for cPanel Agent
│   │   └── marketing/
│   │       └── social-media/     # Docs for Social Media Agent
│   │
│   └── tool-usages/              # Shared Tool Guides
│       └── n8n-expert-persona.md # e.g., n8n integration patterns
│
└── README.md
```

## 📝 Commit Standards

We strictly adhere to **Commitlint** rules (Conventional Commits). All commit messages must follow this format:

```text
type(scope): subject
```

### Allowed Types
*   **feat**: A new agent or feature
*   **fix**: A bug fix in a spec or doc
*   **docs**: Documentation only changes
*   **style**: Formatting changes (white-space, formatting, missing semi-colons, etc)
*   **refactor**: A code change that neither fixes a bug nor adds a feature
*   **chore**: Maintenance tasks, build script changes, etc.

**Examples:**
*   `feat(infra): add initial linux agent specification`
*   `docs(n8n): add expert persona guide`
*   `fix(cpanel): update dns management capabilities`
