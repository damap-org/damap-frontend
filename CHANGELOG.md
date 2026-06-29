# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] -

## [5.0.0] - 2026-29-06

### Fixed 

- Fixed a bug where affiliation separators other than dots would cause the tenant to not be registered [#559](https://github.com/damap-org/damap-frontend/pull/559)
- Fixed a bug in the info section where one line would be displayed as its text key [#565](https://github.com/damap-org/damap-frontend/pull/565)


## [5.0.0] - 2026-06-05

### Added

- Added license dropdown in reused dataset manual input mask [#486](https://github.com/damap-org/damap-frontend/pull/486)
- Added support for more configurable SSO provider connections to decrease friction in deployment [#511](https://github.com/damap-org/damap-frontend/pull/511)
- Added admin panel for customizing system colors [#488](https://github.com/damap-org/damap-frontend/pull/488)
- Added admin panel for customizing logos and images [#488](https://github.com/damap-org/damap-frontend/pull/488)
- Added admin panel for configuring recommended repositories [#488](https://github.com/damap-org/damap-frontend/pull/488)
- Added admin panel for configuring custom templates [#519](https://github.com/damap-org/damap-frontend/pull/519)
- Disabling the project service now hides it in the frontend, making it possible to deploy DAMAP without connected CRIS-Systems [#524](https://github.com/damap-org/damap-frontend/pull/524)
- users without a registered affiliation will get redirected to an info page, instead of seeing the application [#535](https://github.com/damap-org/damap-frontend/pull/535)
- Admins can now change texts from the UI instead of having to work with json files in the codebase [#536](https://github.com/damap-org/damap-frontend/pull/536)
- Admins can now add translations from the UI instead of having to work with json files in the codebase [#536](https://github.com/damap-org/damap-frontend/pull/536)
- Added options for admins to lock the application for non-admins, making it easier to customize [#540](https://github.com/damap-org/damap-frontend/pull/540)
- Added options for admins to disable the consent popup [#540](https://github.com/damap-org/damap-frontend/pull/540)
- Added connection with evaluation service, so users can get their DMP evaluated against certain benchmarks [#552](https://github.com/damap-org/damap-frontend/pull/552)

### Changed

- Improved UI for live preview [#510](https://github.com/damap-org/damap-frontend/pull/510)
- Reworked DMP access feature to base access on system users instead of contributors [#514](https://github.com/damap-org/damap-frontend/pull/514)
- Rework frontend architecture to support multitenant behaviour, enabling simpler cloud deployments [#523](https://github.com/damap-org/damap-frontend/pull/523)
- Errors encountered by accessing external services now show clearer error messages [#484](https://github.com/damap-org/damap-frontend/pull/484)
- Replaced FITS service to make deployments more lightweight [#522](https://github.com/damap-org/damap-frontend/pull/522)
- Update GDPR section, since we now store user data [#539](https://github.com/damap-org/damap-frontend/pull/539)

### Fixed

- Fixed small UI bugs in cost step [#509](https://github.com/damap-org/damap-frontend/pull/509)
- Fixed a bug with searchfields, wehre the x to clear it wouldnt show up [4eef483](https://github.com/damap-org/damap-frontend/commit/4eef4838f865b5850085dbdfc0257770479aa311)
- Fixed a textarea bug, where long label description where cut off [#492](https://github.com/damap-org/damap-frontend/pull/492)
- Fixed a bug where you could sometimes see a white banner flickering when loading the page [#522](https://github.com/damap-org/damap-frontend/pull/522)

## [4.7.0] - 2025-12-11

### Added

- Landing page now shows a meaningful error and tries to connect when the backend is down [#481](https://github.com/damap-org/damap-frontend/pull/481)

### Changed

- Improved UI for contributor section [#483](https://github.com/damap-org/damap-frontend/pull/483)

### Removed

- Removed nx integration to simplify the build [#479](https://github.com/damap-org/damap-frontend/pull/479)

### Fixed

- Added missing HE to text under "How to Create" section [#485](https://github.com/damap-org/damap-frontend/pull/485)
- Updated link in "How to Create" section [#482](https://github.com/damap-org/damap-frontend/pull/482/files)
- Fixed a bug where the wrong person service was used to fetch information [#489](https://github.com/damap-org/damap-frontend/pull/489)
- Fixed broken link in cost section [#501](https://github.com/damap-org/damap-frontend/pull/501)
- Fixed a bug where the export would display different dataset sizes than selected in the frontend [#493](https://github.com/damap-org/damap-frontend/pull/493)

## [4.6.0] - 2025-07-08

### Added

- Added data transfer agreement to options of legal restrictions in step 6 [#440](https://github.com/tuwien-csd/damap-frontend/pull/440)
- Added no license / custom license options for license selector [#449](https://github.com/tuwien-csd/damap-frontend/pull/449)
- Added legal disclaimer text to license selector [#467](https://github.com/tuwien-csd/damap-frontend/pull/467)
- Added option for owners to create new owners in access sections - editors are now barred from the access section [#475](https://github.com/tuwien-csd/damap-frontend/pull/475)

### Changed

- Changed the step size of the cost input from 0.01 to 100.00 [#439](https://github.com/tuwien-csd/damap-frontend/pull/439)
- Made banner input validation in admin panel more user friendly [#447](https://github.com/tuwien-csd/damap-frontend/pull/447)
- Added differentiation between missing datasets and missing produced datasets messages in stepper [#441](https://github.com/tuwien-csd/damap-frontend/pull/441)
- Added support for allowing contributors to have multiple roles assigned [#426](https://github.com/tuwien-csd/damap-frontend/pull/426)
- Made dataset search more user friendly by improving validation and error displays [#465](https://github.com/tuwien-csd/damap-frontend/pull/465)
- Update angular to version 19.2 [#454](https://github.com/tuwien-csd/damap-frontend/pull/454)
- Add option to designate external storages as managed internally by you or your institution - this is then marked as institutional storage when exporting [#443](https://github.com/tuwien-csd/damap-frontend/pull/443)
- Made add manual project more user-friendly by updating verbiage [#442](https://github.com/tuwien-csd/damap-frontend/pull/442)
- Recommended contributors panel now stays open when adding contributors and hides when there are no more recommended persons [#444](https://github.com/tuwien-csd/damap-frontend/pull/444)

### Removed

- Removed SonarCloud from CI pipeline since it didnt work properly [#468](https://github.com/tuwien-csd/damap-frontend/pull/468)
- Cleaned up pipeline by removing linter, since it primarily threw false positives [#443](https://github.com/tuwien-csd/damap-frontend/pull/443)

### Fixed

- Added missing license selector for restricted datasets [#449](https://github.com/tuwien-csd/damap-frontend/pull/449)
- Fixed a bug where wrong input fields where displayed when no data / i dont know was selected [#436](https://github.com/tuwien-csd/damap-frontend/pull/436)
- - Fixed small bugs in the stepper and in the last summary step [#459](https://github.com/tuwien-csd/damap-frontend/pull/459)

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

## [4.3.1] - 2024-12-13

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
