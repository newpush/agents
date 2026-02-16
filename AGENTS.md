# 🔐 Secrets & Configuration
This project follows a "Fetch-on-Demand" architecture for security. All sensitive credentials (API keys, database URLs, etc.) are stored exclusively in 1Password Vaults and are never written to disk or hardcoded in source code.

## Mandatory Security Rules

- NEVER ask the user for secrets in the chat interface.


- NEVER hardcode actual secret values in any files or logs.


- ALWAYS use the 1Password CLI (op) to resolve credentials at runtime.


- RECOGNIZE REFERENCES: Any string starting with ```op://``` is a Secret Reference, not the actual secret. You must use the op run wrapper to resolve these into real values.

# 🚀 Execution Patterns
The 1Password CLI is pre-installed in the environment. When you need to execute scripts, tests, or servers that require credentials, you must wrap the command using the following pattern:

## Standard Command Wrapper
Use the ```--env-file``` flag with the project's .env.template to inject secrets directly into the process memory.

## Examples:


- Running Tests: ```op run --env-file=.env.template -- npm test```


- Database Migrations: ```op run --env-file=.env.template -- python migrate.py```


- Starting a Chat Session: ```op run --env-file=.env.template -- gemini chat``` 

# 🛠 Local Development & Biometrics
When running on a local host, the system may use 1Password Desktop App integration for authentication.


- Biometric Prompts: If a command hangs or fails with an authentication error, it is likely waiting for the user to approve a TouchID, Windows Hello, or System Authentication prompt on their physical machine.


- Troubleshooting: If you receive a "connection reset" or "couldn't connect" error, advise the user to ensure their 1Password desktop app is unlocked and running.

# 📝 Coding Standards
When writing code that requires configuration, always assume the values will be provided via environment variables.
