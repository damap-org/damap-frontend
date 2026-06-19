# Angular Migration Notes

## Change Detection And Zoneless Migration

Angular 22 uses `ChangeDetectionStrategy.OnPush` as the default for components.
Existing components may still explicitly declare:

```ts
changeDetection: ChangeDetectionStrategy.Eager;
```

This was added by the Angular migration to preserve the previous behavior for
components that do not yet notify Angular about state changes in an
OnPush-compatible way.

`ChangeDetectionStrategy.Eager` is needed for components that still rely on
plain mutable component state, imperative subscriptions, timers, callbacks, or
other state updates that are not surfaced through signals, the async pipe, input
changes, template/host events, or explicit change-detection notifications.

Components that rely on signals for state can remove the `changeDetection` row
from the component declaration. With Angular 22, omitting this row uses the
default `ChangeDetectionStrategy.OnPush`.

After the entire project has been updated so that components are
OnPush-compatible and zoneless-compatible, `zone.js` can be removed. This also
requires removing `zone.js` and `zone.js/testing` from the build and test
polyfills/configuration before uninstalling the package.
