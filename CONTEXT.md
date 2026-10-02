# hmcts/ccd-case-ui-toolkit context
> refreshed 2026-10-03 | upstream default: master @ 136dd21e6 (unchanged since 2026-09-30)

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
- 2026-09-30 CI note: `yarn test:audit` is currently red repo-wide. The committed `yarn-audit-known-issues` baseline predates advisories published 2026-09-30 (Angular core/compiler/common, baseline-browser-mapping, brace-expansion, moment), so the `build` job fails at its first step on ANY branch, including unmodified master. Upstream is refreshing the baseline in its own PR EXUI-4988 (suppressions). Fork master's build job was still green on 2026-09-28. Do not bundle a baseline refresh into a trivial PR.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- 2026-08-05 test-coverage — utils.ts role helper coverage (PR #1, fork, open) — lesson: utils.ts helpers already claimed.
- 2026-09-09 a11y — cut-tabs not conformant with WAI-ARIA tabs pattern (role "list" instead of "tablist", no tab ids, no aria-labelledby on panels to tab id, all tabs tabindex=0, no arrow-key nav). pr-opened fork PR #20 (base fork master, draft=false). Verified: problem present in current master; lint + AOT build pass; karma suite not runnable in container (no browser+system libs). Lesson: tabs a11y now claimed.
- 2026-09-30 trivial-fix pack — typos + dead README badges (self-found, no issue). 16 fixes across 10 files (README badge/typo cleanup, 5 comment typos, 4 test-title typos). pr-opened fork PR #32 (base fork master, draft=false, commit aa673e926). Verified: every fix present in current master; `yarn lint`, `yarn build`, `tsc -p tsconfig.spec.json` pass locally on Node 24.18.0; karma not runnable (no browser). CI caveat: `build` job red at `yarn test:audit` — pre-existing advisory-baseline drift, unrelated to the diff. Lesson: README typos + both dead badges (`hits.dwyl.io`, `issuestats.com`) now claimed; remaining markdown links all resolve (checked 2026-09-30).
- 2026-10-02 trivial-fix pack — misspellings in source comments + demo text (self-found, no issue). 13 fixes across 10 files (descrption, placholders, delimeters, detaild, unneccesary, beeen, implimented, usre, doesnt, funciton, instaead, dissapears, sting). pr-opened fork PR #33 (base fork master, draft=false, commit a33897b285). Verified: every fix present in current master; `yarn lint`, `yarn build`, `tsc -p projects/ccd-case-ui-toolkit/tsconfig.spec.json --noEmit` pass locally on Node 26.10.0 / Yarn 4.5.0; karma not runnable (no browser). CI caveat: `build` job red at `yarn test:audit` — pre-existing advisory-baseline drift (EXUI-4988), unrelated to the diff. Lesson: the typos listed above are claimed; remaining unclaimed misspellings are noted under Mined gaps.
- 2026-10-03 trivial-fix pack — misspellings in source comments + test descriptions (self-found, no issue). 19 fixes across 10 files (`sevice`, `doesnt`, `atleast`, `menthods`, `hierachical`, `successs`, `upto`). pr-opened fork PR #34 (base fork master, draft=false, commit fd58e22bf). Verified: every fix present in current master; `yarn lint`, `yarn build`, `tsc -p projects/ccd-case-ui-toolkit/tsconfig.spec.json --noEmit` pass locally on Node 26.10.0 / Yarn 4.5.0; karma not runnable (Chrome cannot capture a display). CI caveat: `build` job red at `yarn test:audit` — pre-existing advisory-baseline drift (EXUI-4988), unrelated to the diff. Lesson: the words above are claimed; remaining misspellings are identifiers/test-data and stay untouched.

## Mined gaps (discovered, not yet attempted)
- 2026-10-02 remaining unclaimed misspellings (exhaustive codespell scan): `doesnt`->`doesn't` (2 test titles + 3 comments), `tripple`, `fomulas`, `hierachical`, `menthods`, `ammend`, `successs`, `atleast`, plus similar in-source typos. status: partly claimed by PR #34 (`doesnt`, `hierachical`, `menthods`, `successs`, `atleast`); `tripple`/`fomulas` are test-data names, not safe edits.
- 2026-10-03 remaining after PR #34: `ammend`->`amend` (field-type-sanitiser.spec.ts test title), `taks`->`tasks` (event-completion-state-machine.service.spec.ts test title); `defendent` is a fixture tag name in a rich-text spec, not a text typo. status: available (fewer than 3 safe fixes; hold until more accumulate — do NOT pad).
- 2026-09-09 tabs.a11y cut-tabs missing tablist role / panel-tab linking / roving tabindex / arrow-key nav — status: attempted (fork PR #20)
- 2026-09-30 doc typos in `RELEASE-NOTES.md` ("accomodate" line 822, "seperate" line 2287) — status: dropped(historical changelog; editing old release-note entries reads as noise, not a fix). Re-pick only if a doc-hygiene PR is explicitly wanted.
