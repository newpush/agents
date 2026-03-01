# Pending Clarifications

<!-- Add new questions below this line using the required format -->

### Question 2026-03-03 - Implementation of ROI Calculators and Verification Bots
*   **Context:** `REQUIREMENTS.md` (Section 5) specifies that the toolkit "must include 'Verification Bots' to audit agent logs for academic credentialing (GMU validation), alongside Python/Excel-based ROI calculator scripts."
*   **Ambiguity:** While there is an example script in `examples/gmu-validation/verification-bot.js`, the Python/Excel-based ROI calculators are currently missing from the repository.
*   **Question:** Are the ROI calculator templates intended to be standalone files in a new `tools/roi-calculators/` directory, or should they be integrated into the existing `examples/` folder?
*   **Answer: [WRITE YOUR ANSWER HERE]**

### Question 2026-03-03 - Automation of Global Security Mandate Injection
*   **Context:** A previous clarification (2026-02-26) stated that "Global security mandates should be included in `AGENTS.md` and injected by the orchestrator or `generate_gemini.js` into the final system prompt."
*   **Ambiguity:** The current `scripts/generate_gemini.js` does not contain logic to read `AGENTS.md` or inject its mandates into the `GEMINI.md` file.
*   **Question:** Should `scripts/generate_gemini.js` be updated to automatically prepend the content of `AGENTS.md` to the generated `GEMINI.md`, or is this injection solely the responsibility of the external orchestrator?
*   **Answer: [WRITE YOUR ANSWER HERE]**

### Question 2026-03-03 - Categorization of Practitioner vs. Accelerator Toolkits
*   **Context:** `REQUIREMENTS.md` (Strategic Alignment #1) mandates that the repository must "categorize its templates and agents to explicitly serve the distinct roles of 'Practitioners' and 'Accelerators'."
*   **Ambiguity:** The current `agents/` and `docs/agents/` directory structure is organized by domain (e.g., `coding/`, `infrastructure/`), not by the Practitioner/Accelerator role categorization.
*   **Question:** Should the repository implement this categorization through new top-level directories (e.g., `agents/practitioner/`, `agents/accelerator/`), or should it be handled via metadata/tags within the existing Markdown personas?
*   **Answer: [WRITE YOUR ANSWER HERE]**
