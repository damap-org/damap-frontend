# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] -

## [4.5.0] - 2025-04-01

### Added

- Added the option to add technical resources to produced datasets, which describe the hardware used to capture the dataset [#424](https://github.com/tuwien-csd/damap-frontend/pull/424).
- Added a dataset info view button, where the whole dataset can be viewed outside of the size-limited table in a popup [#424](https://github.com/tuwien-csd/damap-frontend/pull/424).
- Added info texts to "don't know" and "no data" options in the beginning of the specify research data step [#433](https://github.com/tuwien-csd/damap-frontend/pull/433).

### Changed

- Moved recommended contributors into an expansion panel, so they can be minimized, if needed [#430](https://github.com/tuwien-csd/damap-frontend/pull/430).
- Visible entries in the dataset table are now limited in length, since the table was getting too crowded. [#424](https://github.com/tuwien-csd/damap-frontend/pull/424).

### Fixed

- Fixed a bug where the access to sensitive data textfield was too small [#425](https://github.com/tuwien-csd/damap-frontend/pull/425).
- Fixed a bug where the paginator and sorting in the DMP table would sometimes not work [#431](https://github.com/tuwien-csd/damap-frontend/pull/431).

## [4.4.0] - 2025-02-10

### Added

- Added "Principal Investigator" and "Project Coordinator" as new contributor roles [#374](https://github.com/tuwien-csd/damap-frontend/pull/374).
- Added support for configuring the html title using the backend config [#416](https://github.com/tuwien-csd/damap-frontend/pull/416).
- Added customizable banners to admin section [#404](https://github.com/tuwien-csd/damap-frontend/pull/404).
- Added ethical issue report number input field to ethical section [#397](https://github.com/tuwien-csd/damap-frontend/pull/397).

### Changed

- Reworked the contributor UI [#394](https://github.com/tuwien-csd/damap-frontend/pull/394).
- Changed the default access rights of "other project members" to read only [#405](https://github.com/tuwien-csd/damap-frontend/pull/405).
- Reenabled admin editing of internal storage translations, since a related backend bug was fixed [#417](https://github.com/tuwien-csd/damap-frontend/pull/417).
- Stepper icon now showcase the states locked, empty, in progress and done [#418](https://github.com/tuwien-csd/damap-frontend/pull/418).

### Fixed

- Fixed broken pagination of DMP table [#396](https://github.com/tuwien-csd/damap-frontend/pull/396).
- Fixed small errors in the contributor section and improved visuals [#407](https://github.com/tuwien-csd/damap-frontend/pull/407).
- Fixed a bug where dropdown font size in the storage section was too small [#406](https://github.com/tuwien-csd/damap-frontend/pull/406).

## [4.3.1] - 2024-13-12

### Added

- Added possibility to disable the preview feature [#392](https://github.com/tuwien-csd/damap-frontend/pull/392).
- Added new storage info dialog that also displays storage descriptions [#295](https://github.com/tuwien-csd/damap-frontend/pull/395).

### Fixed

- Fixed a bug where table content in the frontend was not loaded [#377](https://github.com/tuwien-csd/damap-frontend/pull/391).
- Fixed various small visual bugs [#398](https://github.com/tuwien-csd/damap-frontend/pull/398).

### Changed

- Changed wording from "Reused Data" to "Existing Data" in step 3 [#371](https://github.com/tuwien-csd/damap-frontend/pull/371).
- Sample dataset upload in step 3 now opens a seperate dialog [#376](https://github.com/tuwien-csd/damap-frontend/pull/376).

## [4.3.0] - 2024-11-19

...
