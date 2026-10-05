<!-- Please make sure you have read the submission guidelines before posting an PR -->
<!-- https://github.com/tuwien-csd/damap-backend/blob/next/CONTRIBUTING.md#pullrequests -->

## Description

<!-- Please select a type that best describes your PR -->
<!-- Feature/Bugfix/CI/Refactoring/Config/Documentation/... -->

#### What does this PR do?

<!-- Changes introduced by this PR - what happened before, what happens now -->

#### Breaking changes

<!-- Whether this PR contains breaking changes and which -->

#### Code review focus

<!-- What you want the reviewer to focus on -->

#### Dependencies

<!-- If this PR depends on or requires other/additional (backend) changes, please list them here -->

### Checks

<!-- Adjust list as necessary -->

- [ ] Summary updated
- [ ] Version view updated
- [ ] Documentation added
- [ ] Tests added
- [ ] E2e tests created
- [ ] Successfully ran e2e tests before merge

### Ongoing Migrations Checklist

- [ ] `ChangeDetectionStrategy.Eager` removed
- [ ] Signals used and non-signal state management replaced
- [ ] Api - store pattern applied when requests are connected to state (like loading)
- [ ] Http-resource used instead of normal Rxjs where applicable

closes GH-<!-- insert issue number -->
