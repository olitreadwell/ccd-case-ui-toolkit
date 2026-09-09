# hmcts/ccd-case-ui-toolkit context
> refreshed 2026-09-09 | upstream default: master @ cefeb6ed1

## Identity & policies
- upstream: hmcts/ccd-case-ui-toolkit, default branch master, primary language TypeScript (Angular library), English-first yes.
- CLA/DCO: none. signed commits required: no. AI-assisted PR policy: unstated (no AI policy file at repo or hmcts/.github org default).
- PR template: .github/PULL_REQUEST_TEMPLATE.md (JIRA link / Change description / breaking change checkboxes). Org default hmcts/.github also provides CONTRIBUTING + PR template.
- ISSUE-FIRST: CONTRIBUTING says "any ideas on user journeys/experience should first be consulted by submitting a new issue". Bug/test/self-found gap staged in fork; flag issue-first as promotion prerequisite.
- external tracker: github (JIRA referenced only in PR bodies/branch names internally).

## Conventions (verified from merged PRs)
- branch naming: dominant pattern is internal JIRA prefix `exui-XXXX-<slug>` / `EXUI-XXXX-` / `EUI-XXXX-`. External contributors without a JIRA ticket should use `fix/...` / `test/...` plain slug (no owner prefix).
- test cmd: `yarn test` (ng test ccd-case-ui-toolkit-lib --code-coverage, karma). lint: `yarn lint` (ng lint). build: `yarn build`. CI via GitHub Actions (npmpublish.yml + stale.yml only; substantive CI is external).
- commit style: imperative-ish; merge commits reference JIRA e.g. "#2247".
- maintainers merge PRs regularly (many merged Aug-Sep 2026), all internal HMCTS authors.

## Maintainer picture
- Active: many HMCTS-authored PRs merged Aug-Sep 2026 (RiteshHMCTS, chrisjones-hmcts, Josh-HMCTS, olusegz07, AnthonyBorisade). Responsive. Areas in flight: rich-text editor, heading options, staff typeahead, dependency/CVE bump PRs. Avoid overlapping those.

## Issue-area health
- No maintainer-engaged open issues: repo has only the Renovate dependency-dashboard issue #1567 open; the rest (52 "open issues") are PRs. No open GFI/help-wanted labels. -> self-found gap via repo-audit.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- 2026-08-05 test-coverage — utils.ts role helper coverage (PR #1, fork, open) — lesson: utils.ts helpers already claimed.

## Mined gaps (discovered, not yet attempted)
- populate via repo-audit pass (2026-09-09).
