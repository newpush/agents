#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
    REQUIRED_AGENT_SECTIONS,
    REQUIRED_SKILL_SECTIONS,
    REQUIRED_GLOBAL_SECTIONS,
    REQUIRED_TEMPLATE_MARKERS,
    buildGlobalMandates,
    discoverAgents,
    extractAgentHeadings,
    extractTopLevelSections
} = require('./context_helpers');

const repoRoot = path.join(__dirname, '..');
const agentsDir = path.join(repoRoot, 'agents');
const skillsDir = path.join(repoRoot, 'skills');
const agentsMdPath = path.join(repoRoot, 'AGENTS.md');

let failed = false;

function fail(message) {
    failed = true;
    console.error(`AUDIT FAIL: ${message}`);
}

const templates = [
    path.join(repoRoot, 'templates/context/GEMINI.template.md'),
    path.join(repoRoot, 'templates/context/CLAUDE.template.md')
];
const generatedOutputs = [
    path.join(repoRoot, 'GEMINI.md'),
    path.join(repoRoot, 'CLAUDE.md')
];

function checkTemplates() {
    for (const templatePath of templates) {
        if (!fs.existsSync(templatePath)) {
            fail(`Template not found: ${templatePath}`);
            continue;
        }
        const content = fs.readFileSync(templatePath, 'utf8');
        for (const marker of REQUIRED_TEMPLATE_MARKERS) {
            const startTag = `<!-- ${marker}_START -->`;
            const endTag = `<!-- ${marker}_END -->`;
            if (!content.includes(startTag) || !content.includes(endTag)) {
                fail(`${path.basename(templatePath)} missing marker pair: ${startTag} / ${endTag}`);
            }
        }
    }
}

function checkPersonas() {
    console.log('Auditing agent specifications...');
    const agents = discoverAgents(agentsDir);
    for (const agent of agents) {
        const fullPath = path.join(repoRoot, agent.path);
        const content = fs.readFileSync(fullPath, 'utf8');
        const headings = extractAgentHeadings(content);
        
        // Ensure Role exists for our enhanced index
        if (!agent.role) {
            fail(`${agent.path} is missing a '## Role' section (required for the Agent Index).`);
        }

        // Case-insensitive heading match per Decision [2026-04-29] — minor
        // casing differences should not cause structural audit failures.
        const headingsLower = headings.map((heading) => heading.toLowerCase());
        const missing = REQUIRED_AGENT_SECTIONS.filter((required) => {
            const requiredLower = required.toLowerCase();
            return !headingsLower.some(
                (heading) => heading === requiredLower || heading.startsWith(`${requiredLower} (`)
            );
        });
        if (missing.length > 0) {
            fail(`${agent.path} is missing required sections: ${missing.join(', ')}`);
        }

        // Check mandatory Refusal Criteria subsection (aligned with main)
        if (!headingsLower.includes('refusal criteria')) {
            fail(`${agent.path} missing required subsection: Refusal Criteria`);
        }
    }
    console.log(`Audited ${agents.length} agents.`);
}

function checkSkills() {
    console.log('Auditing reusable skill specifications...');
    if (!fs.existsSync(skillsDir)) {
        return;
    }

    const skillFiles = [];
    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.md') && entry.name !== 'SKILL_TEMPLATE.md') {
                skillFiles.push(fullPath);
            }
        }
    };
    walk(skillsDir);

    for (const fullPath of skillFiles) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const headings = extractAgentHeadings(content);
        const headingsLower = headings.map((heading) => heading.toLowerCase());
        const relativePath = path.relative(repoRoot, fullPath);

        const missing = REQUIRED_SKILL_SECTIONS.filter((required) => {
            const requiredLower = required.toLowerCase();
            return !headingsLower.some(
                (heading) => heading === requiredLower || heading.startsWith(`${requiredLower} (`)
            );
        });
        if (missing.length > 0) {
            fail(`${relativePath} is missing required skill sections: ${missing.join(', ')}`);
        }
    }
    console.log(`Audited ${skillFiles.length} skills.`);
}

function checkGeneratedOutputs() {
    let mandates;
    try {
        mandates = buildGlobalMandates(agentsMdPath);
    } catch (error) {
        fail(error.message);
        return;
    }

    const mandateHeadings = [...mandates.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);

    for (const outputPath of generatedOutputs) {
        if (!fs.existsSync(outputPath)) {
            continue;
        }

        const content = fs.readFileSync(outputPath, 'utf8');
        for (const heading of mandateHeadings) {
            if (!content.includes(`## ${heading}`)) {
                fail(`${path.basename(outputPath)} is missing injected mandate heading: ${heading}`);
            }
        }
    }
}

function main() {
    checkTemplates();
    checkPersonas();
    checkSkills();
    checkGeneratedOutputs();

    if (failed) {
        process.exit(1);
    }

    console.log('Repository audit passed.');
}

main();
