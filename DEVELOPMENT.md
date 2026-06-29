# Development

This document describes the DAMAP frontend development workflow, including local commands, tests, linting, and formatting.

## NPM Scripts

| Script                       | Purpose                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `npm run ng`                 | Runs the Angular CLI directly through the local workspace installation.       |
| `npm start`                  | Starts the DAMAP Angular development server.                                  |
| `npm run build`              | Builds the DAMAP frontend with the default Angular build configuration.       |
| `npm run build:prod`         | Builds the DAMAP frontend with the production Angular configuration.          |
| `npm run build:openshift`    | Builds the DAMAP frontend with the OpenShift Angular configuration.           |
| `npm run prepare`            | Installs Lefthook Git hooks.                                                  |
| `npm run test:spec`          | Runs Angular spec tests once with watch mode disabled.                        |
| `npm run test:spec:watch`    | Runs Angular spec tests in watch mode.                                        |
| `npm run test:e2e`           | Runs the Playwright end-to-end suite headlessly.                              |
| `npm run test:e2e:headed`    | Runs the Playwright end-to-end suite with a visible browser.                  |
| `npm run test:e2e:dashboard` | Opens Playwright UI mode for interactive e2e debugging.                       |
| `npm run test:e2e:install`   | Installs the Chromium browser and system dependencies required by Playwright. |
| `npm run typecheck:e2e`      | Type-checks the Playwright e2e TypeScript files.                              |
| `npm run typecheck:strict`   | Strictly type-checks application `*api.ts` and `*store.ts` files.             |
| `npm run typecheck:spec`     | Strictly type-checks Angular spec files.                                      |
| `npm run lint`               | Runs all typechecks and ESLint across the frontend workspace.                 |
| `npm run format`             | Formats the workspace with Prettier.                                          |
| `npm run ci:install`         | Installs dependencies in CI using `npm ci`.                                   |
| `npm run ci:format`          | Runs the CI formatting check.                                                 |
| `npm run ci:build`           | Runs the CI build.                                                            |
| `npm run ci:lint`            | Runs all typechecks and ESLint without applying fixes.                        |
| `npm run ci:test:spec`       | Runs spec tests once for CI.                                                  |
| `npm run ci:test:e2e`        | Runs the Playwright end-to-end suite headlessly for CI-capable environments.  |
| `npm run ci:audit`           | Runs the npm security audit.                                                  |

## Development Server

Run `npm start` to start the DAMAP Angular development server. The application is served at `http://localhost:4200/` and reloads automatically when source files change.

The frontend needs the DAMAP backend for normal application behavior. For the full local stack, refer to the backend project documentation.

## Build

Run `npm run build` to build the DAMAP frontend with the default Angular configuration. Build artifacts are written to `dist/`.

Use `npm run build:prod` for the production configuration and `npm run build:openshift` for the OpenShift configuration.

## Spec Tests

Spec tests are Angular unit tests stored as `*.spec.ts` files under `apps/`. They run through the Angular CLI test target, which uses the project's Vitest configuration.

Use `npm run test:spec` for a single test run. Use `npm run test:spec:watch` while developing tests locally.

Spec files have their own strict TypeScript project in `tsconfig.strict.spec.json`. Run `npm run typecheck:spec` to check only spec files with strict compiler options.

`npm run lint` and `npm run ci:lint` both include `typecheck:spec` before running ESLint. ESLint also applies the strict type-aware rules to `*.spec.ts` through the `tsconfig.strict.spec.json` project, including checks for unsafe assignments, calls, member access, returns, and explicit `any`.

## End-to-End Tests

End-to-end tests are Playwright tests stored under `e2e/`. They run against the real Angular application and the real local DAMAP backend stack.

Playwright starts only the Angular development server. Before running e2e tests, start the Quarkus dev backend at `http://localhost:8080` and Keycloak with the `damap` realm at `http://localhost:8087`.

Run `npm run test:e2e:install` once to install Chromium and its required system dependencies. Use `npm run test:e2e` for the default headless run, `npm run test:e2e:headed` to watch the browser, and `npm run test:e2e:dashboard` to open Playwright UI mode.

The login setup uses the real Keycloak UI. The default e2e credentials are `admin` / `admin`; override them with `DAMAP_E2E_USERNAME` and `DAMAP_E2E_PASSWORD`.

The authentication setup project saves browser storage under `e2e/.auth/`. DAMAP stores OAuth state in `sessionStorage`, so the e2e support code saves and restores that session state in addition to Playwright's normal storage state.

E2e files have their own strict TypeScript project in `tsconfig.e2e.json`. Run `npm run typecheck:e2e` to check only Playwright files and config.

`npm run lint` and `npm run ci:lint` both include `typecheck:e2e` before running ESLint. ESLint also applies the strict type-aware rules to `e2e/**/*.ts` and `playwright.config.ts` through the `tsconfig.e2e.json` project, including checks for unsafe assignments, calls, member access, returns, and explicit `any`.

## Linting

Linting is handled by ESLint with Angular ESLint and TypeScript ESLint. Run `npm run lint` locally before opening a pull request.

The `lint` command first runs all strict typechecks:

- `typecheck:strict` for application `*api.ts` and `*store.ts` files
- `typecheck:spec` for Angular spec files
- `typecheck:e2e` for Playwright e2e files and config

After the typechecks pass, `lint` runs `eslint .` across the workspace. The same no-fix behavior is used in CI through `npm run ci:lint`.

ESLint is configured in `eslint.config.js`. Type-aware strict rules are enabled for application API/store files, spec files, e2e files, and `playwright.config.ts`.

## Formatting

Formatting is handled by Prettier. Run `npm run format` locally to format the workspace.

CI uses `npm run ci:format`, which runs `npx prettier --check .` without changing files. If CI reports formatting failures, run `npm run format` locally and commit the resulting changes.

Generated and local-only files are excluded through `.prettierignore`, including dependencies, build output, coverage output, Angular cache files, Playwright reports, and saved e2e auth state.

## Git Hooks

Git hooks are managed with Lefthook. Hooks are installed by `npm run prepare`, which also runs automatically after `npm install`.

The pre-commit hook runs only:

- `npm run format`
- `npm run lint`

Formatting changes are staged automatically by Lefthook through `stage_fixed: true`.
