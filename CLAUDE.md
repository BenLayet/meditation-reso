# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A meditation timer PWA built for the [Reso meditation school](https://www.reso.co/), embedded via iframe. It uses a custom state-management framework called **softer-components** (sibling repo at `../softer-components`), backed by Redux. The `vite.config.ts` aliases `@softer-components/*` to local source paths in that sibling repo.

## Commands

```bash
pnpm dev          # Start dev server (opens browser automatically)
pnpm build        # Prebuild (writes build info) + tsc + vite build
pnpm test         # Run tests in watch mode (vitest)
pnpm ci:test      # Run tests once (CI mode)
pnpm type-check   # Type-check without emitting
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

Run a single test file:
```bash
pnpm vitest run test/app.component.test.ts
```

## Architecture: softer-components Pattern

Every component follows a strict **split-file convention**. Each component folder contains these files:

| File | Purpose |
|------|---------|
| `*.component.state.ts` | Immer-compatible initial state shape and `State` type |
| `*.component.contract.ts` | Assembles `Contract = { state, events, values, children? }` — leaf components omit `children` |
| `*.component.events.ts` | `allEvents` and `uiEvents` as `as const` arrays; `EventsContract<typeof allEvents, Payloads, typeof uiEvents>` |
| `*.component.selectors.ts` | Pure functions `(state) => derived value`; exported as `Values` type |
| `*.component.updaters.ts` | Immer state mutations keyed by event name; exported as `stateUpdaters: StateUpdaters<Contract, State>` |
| `*.component.forwarders.ts` | Single `eventForwarders` object typed as `EventForwarders<Contract>` with `internal?`, `children?` sub-keys |
| `*.component.effects.ts` | Async side-effects; defines `Dependencies` type |
| `*.component.config.ts` | Exports `config(deps): ComponentDefConfig<Contract>` — only `effects` and/or `childrenDefs`; also re-exports `Dependencies` |
| `*.component.ts` | Assembles and exports the `ComponentDef` factory, `Contract` type alias, `Dependencies` type alias |
| `*.tsx` | React view — reads state via `useSofter<Contract>(path)`, dispatches UI events |
| `index.ts` | Re-exports the component def, contract type, and dependencies type |

### Event flow

1. **UI events** (`uiEvents`) are dispatched by the React component.
2. **Internal forwarders** (`eventForwarders.internal`) route events to other events within the same component, optionally with `onCondition` guards and `withPayload` transforms.
3. **`stateUpdaters`** mutate state (Immer-style, no return value needed).
4. **Effects** (`config.effects`) handle async work; they receive event-dispatch functions as the first argument and the triggering event as the second.
5. **Children forwarders** (`eventForwarders.children`): `commands` push parent events down to children; `listeners` bubble child events up to parent.

### Component tree

```
App (app/)
├── NewMeditation (new-meditation/)
│   └── Settings (new-meditation/settings/)
└── MeditationSession (meditation-session/)
```

`App` switches between `NewMeditation` and `MeditationSession` based on `isStarted`. When the user clicks Start, `NewMeditation` emits `startRequested` (carrying the `Settings` payload), which the App listens to and converts into a `meditationSessionStarted` command sent to `MeditationSession`.

### Session phase lifecycle

`MeditationSession` has four phases: `INITIALIZING → PREPARATION → MEDITATION → COMPLETED`. The `initialize` event (triggered by the parent) starts the chain: requests wake lock, loads audio, enters fullscreen, and kicks off either preparation or meditation depending on `preparationInSeconds`.

## Services and Adapters

Services are defined as interfaces in `src/services/` with concrete implementations. Adapters in `src/adapters/` provide platform-specific implementations (e.g., IndexedDB vs localStorage for settings persistence, NoSleep.js as a wake-lock fallback for Android WebView).

All services are wired in `src/configuration.ts` and injected via the `Dependencies` type pattern — components never import services directly.

## Testing

Tests live in `test/` and use `@softer-components/utils/test-utilities` (`initTestStore`, `TestStore`). Tests dispatch `GlobalEvent` arrays via `testStore.when()` and `testStore.and()`, then assert on values via `testStore.getValues(path)`.

Mock dependencies (`test/mock-dependencies.ts`) implement service interfaces directly. The `MockTickingService.mockTickCount` controls how many ticks fire during a `startTicking` call.

State paths follow the component tree: `/` (App), `/newMeditation`, `/newMeditation/settings`, `/meditationSession`.
