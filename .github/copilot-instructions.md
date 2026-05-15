# Copilot Instructions

## Creating GitHub Issues

When I ask you to create a GitHub issue, always use this exact format:

---

**Title:** [Category]: Short clear description

---

**Goal**

One or two sentences. What problem does this solve or what outcome does it achieve?

---

**Scope**

- Bullet list of specific tasks, file changes, or implementations included
- Be specific — name actual files, components, routes, or functions where possible

---

**Acceptance Criteria**

- [ ] Criterion one — measurable and testable
- [ ] Criterion two — measurable and testable
- [ ] Criterion three — measurable and testable

---

**Out of Scope**

- Bullet list of things explicitly NOT included in this issue
- Required — never omit this section

---

## Rules

- Always prefix the title with one of these categories: Feature, Fix, Setup, UI, Auth, AI, Payments, Storage
- Acceptance Criteria must use checkbox format (- [ ]) and must be verifiable
- Out of Scope section is always required
- Goal is 1-2 sentences max
- Scope bullets should name actual files or components when the codebase is known
- When creating the issue via CLI use this command format:
  gh issue create --title "TITLE HERE" --body "BODY HERE"
