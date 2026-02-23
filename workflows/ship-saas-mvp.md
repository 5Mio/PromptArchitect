---
description: Build and ship a minimal SaaS MVP (Plan, Backend, Frontend, Test, Ship)
---

This workflow guides you through building and shipping a minimal SaaS product using the Antigravity skills.

1. **Plan the MVP Scope**
   - Goal: Define clear boundaries and acceptance criteria.
   - Action: Read the `concise-planning` skill to structure the plan.
   - command: `view_file .agent/skills/skills/concise-planning/SKILL.md`
   - Prompt me: "Let's use the **brainstorming** skill to define the milestones and acceptance criteria for our MVP."

2. **Design Data & API**
   - Goal: Establish core entities and API structure.
   - Action: Read the `database-design` skill.
   - command: `view_file .agent/skills/skills/database-design/SKILL.md`
   - Prompt me: "Use **database-design** principles to create the schema for our users and core resources."

3. **Build the Frontend Core**
   - Goal: Implement the main user flows.
   - Action: Read `frontend-design` and `react-best-practices`.
   - command: `view_file .agent/skills/skills/frontend-design/SKILL.md`
   - Prompt me: "Use **frontend-developer** and **frontend-design** skills to build the dashboard layout and onboarding flow."

4. **Verify Quality**
   - Goal: Ensure critical paths work.
   - Action: Read `browser-automation` or `test-driven-development`.
   - Prompt me: "Let's use **browser-automation** to create E2E tests for the signup process."

5. **Ship to Production**
   - Goal: Release with confidence.
   - Action: Read `deployment-procedures`.
   - Prompt me: "Use **deployment-procedures** to create a release checklist."
