# ccd-case-ui-toolkit 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/hmcts/ccd-case-ui-toolkit/branch/master/graph/badge.svg)](https://codecov.io/gh/hmcts/ccd-case-ui-toolkit)
[![Known Vulnerabilities](https://snyk.io/test/github/hmcts/ccd-case-ui-toolkit/badge.svg)](https://snyk.io/test/github/hmcts/ccd-case-ui-toolkit)

# Quick Start (for local development and testing)

```bash
# Install all dependencies
yarn install

# Create symbolic link
yarn link

# Build library in watch mode
yarn build:watch
```

In your project folder that should consume the library:

```bash
# Go to consumer repository folder
cd case-management-web

# Link your library to the project
yarn link "@hmcts/ccd-case-ui-toolkit"

yarn start

```

*Note: The linking might be broken so if you encounter problems please follow this process:*

```bash
# Install all dependencies
yarn install

# Build library in watch mode
yarn build:watch
```

In your project folder that should consume the library:

```bash
# Go to consumer repository folder
cd case-management-web

# Remove existing toolkit dist
rm -rf node_modules/\@hmcts/ccd-case-ui-toolkit/dist

# Link your library to the project
cp <location of ccd-case-ui-toolkit>/dist node_modules/\@hmcts/ccd-case-ui-toolkit

yarn start

```

You can also have a quick look at an example usage of the UI Toolkit demo project (after both folders had `yarn install` ran on them) by:
```bash
# Build the toolkit and fire up the demo application to view it
yarn demo
```

Broken down into individual steps, this does the following:
```bash
# build UI Toolkit
yarn build:esm

# copy UI Toolkit dist folder to demo/node_modules/@hmcts/ccd-case-ui-toolkit/dist
yarn build:demo

# start demo app and stub server in same process
yarn start
# Go to http://localhost:8080
```

# File Structure

```
case-ui-toolkit
|
├─ demo                         - Self documenting application consuming components from src/shared/components
| ├─ src                        - Application sources folder
| | ├─ app                      - Components and modules implementing application
| | ├─ public                   - Fonts and images for application
| | ├─ style                    - Styles for application
| | ├─ index.html               - Index page of application
| | ├─ main.ts                  - Application initialisation logic
| | └─ tsconfig.app.js          - Src folder typescript options to compile with
| ├─ stubs                      - Back end stubs the application starts off
| ├─ angular.js                 - Angular options to configure the application
| ├─ gulpfile.js                - Gulp tasks to copy the built ui toolkit library to demo application
| ├─ heroku-publish.js          - Script that deploys demo application latest master to Heroku
| ├─ package.json               - yarn dependencies, scripts and package configuration for demo application
| ├─ README.md                  - README for the demo app
| ├─ server.js                  - Demo application startup script.
| ├─ tsconfig.js                - Typescript base options that different config files derive from
| └─ yarn.lock                  - File storing locked down dependencies for consistent installs
|
├─ src                          - Library sources home folder
| ├─ scripts                    - Contains CI/Release related scripts
| ├─ components                 - Basic building blocks components with tests for CCD
| ├─ shared                     - Folder containing exportable components and directives that are shared with library consumers
| | ├─ components               - Components that are meant to be shared with library consumers (e.g. ExUI)
| | | ├─<component>             - Example component
| | | | ├─ domain               - Component specific domain structures
| | | | ├─ services             - Component specific services
| | | | └─ <component files>    - Template, Component, Module and index files
| | ├─ directives               - Directives that are meant to be shared with library consumers (e.g. ExUI)
| | | ├─<directive>             - Example directive
| | | | ├─ domain               - Directive specific domain structures
| | | | ├─ services             - Directive specific services
| | | | └─ <directive files>    - Template, Component, Module and index files
| | ├─ domain                   - Domain structures that are used by shared components and directives
| | ├─ fixture                  - Test domain builders and fixtures for shared components and directives
| | ├─ pipes                    - Pipes for shared components and directives
| | ├─ services                 - Common services for shared components and directives
| | └─ test                     - Other test helpers
| └─ index.ts                   - Library entry point that is used by builders
|
├─ .editorconfig                - Common IDE configuration
├─ .gitignore                   - List of files that are ignored while publishing to git repo
├─ .npmignore                   - List of files that are ignored while publishing to npmjs
├─ LICENSE.md                   - License details
├─ README.md                    - README for the library
├─ gulpfile.js                  - Gulp helper scripts
├─ karma-test-entry.ts          - Entry script for Karma tests
├─ karma.conf.ts                - Karma configuration for our unit tests
├─ package.json                 - yarn dependencies, scripts and package configuration
├─ tsconfig-aot.json            - TypeScript configuration for AOT build
├─ tsconfig.json                - TypeScript configuration for UMD and Test builds
├─ tslint.json                  - TypeScript linting configuration
├─ webpack-test.config.js       - Webpack configuration for building test version of the library
├─ webpack-umd.config.ts        - Webpack configuration for building UMD bundle
└─ yarn.lock                    - yarn lock file that locks dependency versions
```

# Getting Started

## Build the library
- `yarn build` for building the library once (both ESM and AOT versions).
- `yarn build:watch` for building the library (both ESM and AOT versions) and watch for file changes.

You may also build UMD bundle and ESM files separately:
- `yarn build:esm` - for building AOT/JIT compatible versions of files.
- `yarn build:esm:watch` - the same as previous command but in watch-mode.
- `yarn build:umd` - for building UMD bundle only.
- `yarn build:umd:watch` - the same as previous command but in watch-mode.

## Build the library (for CCD devs working on ccd-case-management-web)
For CCD developers it should be noted the library should be built with just the `yarn build:esm` which is much faster. That will build the JIT version that is currently used by case management web.

## Other commands

#### Test the library
- `yarn test` for running all your `*.spec.ts` tests once. Generated code coverage report may be found in `coverage` folder.
- `yarn test:watch` for running all your `*.spec.ts` and watch for file changes.

# Library development workflow

In order to debug your library in browser you need to have Angular project that will consume your library, build the application and display it. For your convenience all of that should happen automatically in background so once you change library source code you should instantly see the changes in browser.

There are several ways to go here:
- Use your **real library-consumer project** and link your library to it via `yarn link` command (see below).
- Use [Angular-CLI](https://cli.angular.io/) to generate library-consumer project for you and then use `yarn link` to link your library to it.

### Using consumer applications

You may take advantage of watch-modes for library build in order to see changes to your library's source code immediately in your browser.

To do so you need to:
1. Open two console instances.
2. Launch library build in watch mode in first console instance by running `yarn build:watch` (assuming that you're in `case-ui-toolkit` root folder).
3. Launch your consumer project build (JIT version) in watch-mode by running `yarn start` in second console instance (for instance assuming that you're in `case-management-web` folder).

As a result once you change library source code it will be automatically re-compiled and in turn your JIT consuming project (e.g. case-management-web) will be automatically re-built and you will be able to see that changes in your browser instantly.

### Library Release


Prerelease version from PR branch should follow the format as `x.y.z-RDM-xxx-prerelease`

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](../LICENSE.md) file for details.
CCD CASE UI TOOLKIT
===================

Overview
--------

@hmcts/ccd-case-ui-toolkit is an Angular component library for CCD and XUI
case-management applications. It provides reusable case-form components,
directives, services, models, fixtures and supporting utilities.

The repository also contains:

- A library build using Angular and ng-packagr.
- A demo application and synthetic browser-test host.
- Karma/Jasmine unit tests.
- Playwright source-host tests.
- A packaged-consumer smoke test for the built package.
- Documentation generation with Compodoc.
- CI and publishing configuration.

The published package name is:

    @hmcts/ccd-case-ui-toolkit


Prerequisites
-------------

- Node.js 24.22.2 or a later version accepted by package.json.
- Yarn 4.5.0, managed through the repository's Yarn configuration.
- A Git checkout with the repository files available.
- Chromium if you are running the Playwright browser tests.

Check the required Node.js version in .nvmrc and package.json before changing
your local runtime. On Windows, Git Bash or WSL is recommended for shell
commands that use Unix-style syntax.

Install dependencies from the repository root:

    corepack enable
    yarn install --immutable

The repository uses a node-modules linker. Do not commit node_modules, build
output, coverage or browser-test results.


Repository layout
-----------------

    projects/ccd-case-ui-toolkit/
        src/                       Library source and public API
        ng-package.json            ng-packagr configuration
        package.json               Library metadata and peer dependencies

    demo/                          Example application and stubs
    packaged-consumer/             Application that consumes the built package
    playwright_tests/              Source-host browser tests and test host
    scripts/                       Build synchronisation and smoke checks
    angular.json                   Angular workspace configuration
    package.json                   Workspace scripts
    dist/                          Generated package output
    docs/                          Generated Compodoc output

The library entry point is projects/ccd-case-ui-toolkit/src/public-api.ts.


Build the library
-----------------

Build the package once:

    yarn build

This runs the condition-parser generation step, builds the
ccd-case-ui-toolkit-lib Angular library and synchronises the package output
into dist/.

The explicit library build command is:

    yarn build:library

Build the library continuously while editing source files:

    yarn build:library:watch

The generated package is written to:

    dist/ccd-case-ui-toolkit/

Generated parser files are created by the condition-parser task. Do not edit
the generated condition-parser.generated.ts file by hand; change the source
condition grammar and regenerate it instead.


Use the library in a consumer application
------------------------------------------

The preferred verification path is the repository's packaged-consumer gate:

    yarn test:packaged-consumer

This checks the webapp material contract, builds the library and runs the
packaged-consumer smoke test against the generated package.

For stricter peer-dependency validation, run:

    yarn test:packaged-consumer:strict

The packaged consumer is configured to run on port 4301:

    cd packaged-consumer
    yarn start

Use the packaged-consumer workflow to validate the installed package rather
than relying only on source imports. Source-host tests and installed-package
tests prove different compatibility boundaries.

Legacy linking

The older README described yarn link and manual copying of dist/. Linking can
be useful for local investigation, but it is more fragile with modern Yarn,
Angular and peer dependencies. Prefer the packaged-consumer smoke test or the
consumer application's normal package workflow. If linking is unavoidable,
build the library first and verify that the consumer resolves the intended
package version and peer dependencies.


Run the Playwright source host
------------------------------

Install the Chromium browser used by the suite:

    yarn playwright install chromium --only-shell

Run Playwright support checks:

    yarn lint:playwright
    yarn test:playwright:typecheck

List available scenarios:

    yarn test:playwright --list

Run the full source-host browser suite:

    yarn test:playwright

Start the synthetic Angular host when inspecting it manually:

    yarn serve:playwright

The host is served at:

    http://127.0.0.1:4300

The Playwright runner starts the host as required by its configuration. Keep
ports 4300 and 4301 available when running browser or packaged-consumer tests.

Run a focused feature where appropriate:

    yarn test:playwright payment-contract
    yarn test:playwright advanced-fields

The source-host suite uses synthetic data, isolated browser contexts, an
en-GB locale and the Europe/London time zone. It validates named component
contracts; it does not prove that deployed services or every consuming
application are compatible.


Playwright evidence
-------------------

Generated browser evidence is written below playwright_tests/test-results/.
It can include:

- JUnit results.
- Perfetto timeline data.
- Failure screenshots and traces.
- Odhín HTML reports.

The main report locations are:

    playwright_tests/test-results/junit.xml
    playwright_tests/test-results/perfetto.json
    playwright_tests/odhin-report/toolkit-playwright.html

The packaged-consumer gate writes its evidence below
packaged-consumer-results/.

These outputs may contain test data and should be treated as generated,
potentially sensitive artefacts. They are ignored by Git and should not be
committed.


Unit tests and coverage
-----------------------

Run the Angular unit tests with coverage:

    yarn test

Run the unit tests in watch mode:

    yarn test:watch

Coverage output is written under coverage/.

Create a coverage report when coverage data already exists:

    yarn coverage


Linting, audits and documentation
---------------------------------

Run the library lint checks:

    yarn lint

Run the Playwright-specific lint checks:

    yarn lint:playwright

Run reporting and reporter checks:

    yarn lint:playwright:reporting

Run the dependency audit against the repository's known-audit baseline:

    yarn test:audit

Generate Compodoc documentation:

    yarn docs

The generated documentation is written to docs/.

Run the main CI-style local checks:

    yarn ci

The CI command runs lint, unit tests, the library build and documentation
generation. It may take longer than targeted checks.


Development workflow
--------------------

1. Create a focused branch.
2. Install dependencies with yarn install --immutable.
3. Make the source change under projects/ccd-case-ui-toolkit/src/.
4. Run yarn build:library:watch while developing a consumer integration.
5. Run targeted unit tests and Playwright scenarios.
6. Run yarn lint and yarn test.
7. Run yarn test:packaged-consumer for package-boundary changes.
8. Run yarn ci before a release or when broad changes affect the library.
9. Review generated output and confirm that no sensitive artefacts are staged.

When a public component, directive, service, model or pipe is added, update
the public API exports and add or update focused tests. Keep assertions close
to the component or service contract they verify.


Release and publishing notes
-----------------------------

The package is published as an npm package with public access configured in
package.json. Use the repository's approved release and CI process.

Before publishing:

- Confirm the package version and release notes.
- Run yarn ci.
- Run yarn test:packaged-consumer and, where required,
  yarn test:packaged-consumer:strict.
- Confirm peer dependency ranges for supported Angular consumers.
- Review the generated dist/ package contents.
- Confirm that credentials, local configuration and test results are excluded.

Prerelease versions from a pull request should follow the repository's agreed
format, for example x.y.z-RDM-xxx-prerelease.


Troubleshooting
---------------

Dependencies do not install

- Check the Node.js version against .nvmrc and package.json.
- Run corepack enable.
- Use yarn install --immutable in a regular checkout.
- If a Git worktree prevents an install hook from running, use
  yarn install --immutable --mode=skip-build as a temporary dependency-linking
  workaround, then run the explicit lint, typecheck, browser and package
  checks. This workaround does not prove that install hooks work normally.

The library build fails

- Run yarn generate:condition-parser.
- Check the generated parser file is not being edited manually.
- Remove generated temporary output with yarn clean:tmp and rebuild.
- Check Angular, TypeScript and peer dependency versions.

Consumer cannot resolve the package

- Rebuild the library with yarn build.
- Confirm that the consumer is resolving the intended dist/ or package
  version.
- Check Angular and peer dependency compatibility.
- Prefer the packaged-consumer smoke test over manual copying of dist/.

Playwright cannot start

- Install Chromium with yarn playwright install chromium --only-shell.
- Check that ports 4300 and 4301 are free.
- Run yarn test:playwright:typecheck.
- Run the scenario with --list to confirm that it is selected.
- Retain the failing trace and screenshot before starting another run, because
  subsequent commands may overwrite the test-results directory.

Reports are missing

- Check playwright_tests/test-results/ and playwright_tests/odhin-report/.
- Run the explicit reporter checks.
- If a run is interrupted before Odhín creates its report, use the repository
  report helper and record that the report was generated as unavailable.


UK English and user-facing text
--------------------------------

Use UK English in documentation, test descriptions and user-facing examples.
Preferred spellings include:

    organisation / organisations
    authorise / authorisation
    behaviour
    centre
    colour
    customise / customisation
    licence (noun) / license (verb)
    analyse / analysed
    catalogue
    prioritise

Keep API names, package names, TypeScript identifiers, test tags and external
service names unchanged where their spelling is part of a technical contract.


Licence
-------

This project is licensed under the MIT Licence. See LICENSE.md for the full
licence text.
