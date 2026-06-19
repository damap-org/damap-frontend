# Angular

<!-- Official Angular Best Practices -->

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices from 2026 SOTA.

## Angular MCP

This repo uses the `angular-cli` MCP server.

Use Angular MCP for Angular-specific work when the task depends on current Angular behavior, official best practices, workspace structure, migrations, APIs, CLI behavior, or version-specific details. Do not ask the user to remind you to use it.

- Use `list_projects` when workspace/project structure matters.
- Use `get_best_practices` before generating or substantially changing Angular code.
- Use `search_documentation` for Angular API, CLI, migration, or version-specific details.
- Use `onpush_zoneless_migration` for change detection or zoneless migration planning.

For trivial edits that are fully determined by nearby code, do not call MCP unless uncertainty appears.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular 22 Defaults

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT create new NgModules for application code unless a compatibility boundary requires it.
- Use the Angular v22 application builder (`@angular/build:application`) patterns already present in the workspace.
- Prefer the Angular CLI for generation, migrations, builds, and tests. Use `ng generate`, `ng update`, and Angular schematics rather than hand-writing generated structure when possible.
- Follow the 2025 Angular style guide naming style for new files unless nearby files use an older convention.
- Use the framework defaults for new Angular 22 code: standalone APIs, strict typing, modern build tooling, and zoneless-compatible patterns.

## Angular Best Practices

- Use signals for state management
- Use `ChangeDetectionStrategy.OnPush` for application components unless there is a specific reason not to.
- Write code that is compatible with zoneless change detection. Do not rely on ZoneJS to notice state changes.
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Use `afterNextRender`/`afterEveryRender` instead of `NgZone.onStable`, `NgZone.onUnstable`, `NgZone.onMicrotaskEmpty`, or `NgZone.isStable`.
- `NgZone.run` and `NgZone.runOutsideAngular` can remain when they serve a real interop/performance purpose.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use signal-based inputs, outputs, view queries, and content queries instead of decorator-based APIs when available.
- Use `computed()` for derived state
- Use `model()` only for intentional two-way binding APIs.
- Prefer inline templates for small components
- Prefer Signal Forms for new form work.
- Use Reactive Forms only when Signal Forms are a poor fit, existing code already uses Reactive Forms, or an integration requires Reactive Forms.
- Do not use Template-driven forms for new code.
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.
- Prefer component `imports` arrays with direct imports. Let the Angular Language Service/CLI manage imports where possible.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Use `linkedSignal()` for writable state that must reset or derive from another signal while preserving user edits.
- Use `effect()` for synchronization with external systems, not for ordinary state propagation.
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Prefer `resource`, `rxResource`, and `httpResource` for async state and reactive data loading.
- Use `httpResource` for reactive read-only HTTP data that depends on signals.
- Avoid `httpResource` for mutations such as POST/PUT/DELETE; use `HttpClient` directly for those.
- Guard resource value reads with `hasValue()` before reading `value()`.

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Always provide a meaningful `track` expression in `@for` blocks. Prefer stable IDs over `$index`; use `$index` only for static collections.
- Use `@empty` for empty states in `@for` when the UI needs a fallback.
- Use `@let` for readable local template variables instead of repeating complex expressions.
- Use `@switch` with `@default never;` or `@default never(value);` for exhaustive checking of union-like states when appropriate.
- Use `@defer` for heavy, non-critical UI that can be lazy loaded. Include accessible `@placeholder`, `@loading`, and `@error` states when useful.
- Avoid deferring content visible in the initial viewport when it would harm LCP or cause layout shift.
- Avoid nested `@defer` blocks with identical triggers that create cascading loads.
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `@Service()` option for singleton services
- Use the `inject()` function instead of constructor injection
- Use `provideHttpClient()` and functional providers/interceptors for HTTP setup.
- Keep services framework-agnostic where practical; put UI-specific state in components or focused facades.

## Routing and Rendering

- Prefer lazy loaded route components/features.
- Use functional route guards, resolvers, and interceptors.
- For SSR/SSG/hybrid rendering, use Angular's route-level render mode configuration rather than ad hoc server checks.
- When using SSR or prerendering, account for event replay and hydration. Avoid direct DOM mutations that can break hydration.
- Use incremental hydration with `@defer` for large server-rendered pages when it improves startup behavior.

## Testing

- Prefer the project's configured test runner. Angular 22 defaults to Vitest for new projects.
- In zoneless-compatible tests, prefer `await fixture.whenStable()` and signal-driven updates over repeated manual `fixture.detectChanges()` where practical.
- For `@defer` blocks, use Angular's defer block testing APIs when asserting placeholder/loading/error/complete states.
- Add focused tests for user-visible behavior, routing, forms, and state transformations.

## Modern Angular 17-22 Summary

- Angular v17 made standalone application authoring and the Vite/esbuild application builder the default for new apps.
- Angular v17 introduced built-in control flow and deferrable views; both are stable by Angular v18.
- Angular v18 expanded stable deferrable views and introduced experimental zoneless support.
- Angular v19 advanced incremental hydration, route-level render modes, event replay, and zoneless support.
- Angular v20 made standalone the implicit component default, so `standalone: true` should not be written.
- Angular v20 stabilized core signal primitives including `signal`, `computed`, `effect`, `linkedSignal`, signal inputs, and signal queries.
- Angular v20 stabilized incremental hydration and route-level render modes.
- Angular v20.2 stabilized zoneless Angular.
- Angular v21 made zoneless the default for new apps and made Vitest the primary test runner for new projects.
- Angular v22 continues the modern defaults: standalone, signals, native control flow, deferrable views, zoneless-compatible components, Signal Forms, resources, `httpResource`, CLI AI config, and MCP-assisted tooling.

When these instructions conflict with current Angular MCP documentation for the installed framework version, trust Angular MCP and update the instructions if the change is durable.

# Damap Frontend

// TODO: Add project guidelines and descriptions here
