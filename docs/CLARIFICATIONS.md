# Pending Clarifications

<!-- Add new questions below this line using the required format -->

### ❓ Question [2026-03-03] - Missing Casdoor Integration in Fleet Deployment
**Context:** The requirements state "It needs automated provisioning templates for a multi-tenant stack including... Casdoor (identity)", but the `examples/fleet-deployment/docker-compose.yml` file is missing a Casdoor service definition.
**Ambiguity / Drift:** The fleet deployment example currently lacks the required identity provider, preventing a full demonstration of the multi-tenant security architecture.
**Question for Product Owner:** Should Casdoor be added to the current `docker-compose.yml` in `examples/fleet-deployment/`, or is it intended to be a separate integration example?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update `examples/fleet-deployment/docker-compose.yml` to include a configured Casdoor service and link it to the existing n8n and Traefik instances once the configuration details are provided.*

### ❓ Question [2026-03-03] - Missing ROI Calculator Scripts
**Context:** The requirements state "The toolkit must include... Python/Excel-based ROI calculator scripts to ensure agents deliver measurable business value".
**Ambiguity / Drift:** No such calculator scripts exist in the repository, making it difficult for users to justify agent deployments using the project's recommended methodology.
**Question for Product Owner:** Where should these ROI calculator scripts be located, and are there specific metrics (e.g., time saved, token cost) they must prioritize?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Create a new `scripts/roi/` directory and implement the initial Python-based ROI calculator as per the specified metrics.*

### ❓ Question [2026-03-03] - Python Dependency in Pre-Flight Check
**Context:** The `scripts/verify-env.sh` pre-flight script requires `python3` to be installed, but the `REQUIREMENTS.md` file now explicitly states that "Python runtime support is officially deprecated".
**Ambiguity / Drift:** There is a contradiction between the system's own health check and the stated requirements, which may confuse new developers.
**Question for Product Owner:** Should the `python3` check be removed from `verify-env.sh` and `verify-env.ps1`, or is it still required for certain optional examples (like the GMU validation bot)?
**Answer:** [LEAVE BLANK FOR HUMAN TO FILL]
**🤖 Jules Action Prompt:** *Update `scripts/verify-env.sh` and `scripts/verify-env.ps1` to remove the Python dependency check or move it to an optional "Extended Features" check.*
