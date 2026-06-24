# DAMAP

DAMAP is an open source tool co-developed by TU Wien and TU Graz that supports researchers in managing both data and code along the research data lifecycle. It is based on the concept of machine-actionable data management plans (maDMPs) and aims to simplify the creation of data management plans (DMPs) for researchers.

The tool integrates with an institution's existing databases — such as project management and HR systems (CRIS applications) — to automatically pull relevant information into a DMP, increasing accuracy and reducing the effort required to complete one. This saves DMP authors from having to enter the same data multiple times.

DAMAP guides users through all sections of a DMP in ten steps by asking questions, suggesting text, and providing helpful information. It exports a pre-filled DMP as a Word document that can be customized and submitted to European and national research funders. Supported export templates include FWF, Horizon Europe, and Science Europe. Additionally, DAMAP is compatible with the [RDA recommendation on machine-actionable DMPs](https://doi.org/10.15497/rda00039) and offers a JSON export.

The content and structure of DAMAP is based on [Science Europe's Core Requirements for Data Management Plans](https://doi.org/10.5281/zenodo.4915861).

DAMAP is available under the MIT license and can be self-hosted by any institution. Alternatively, TU Wien offers a cloud-hosted version of DAMAP, allowing institutions to get started without running their own infrastructure. For more information on both options, visit [damap.org](https://damap.org/).

## Damap Project and Documentation

For an overview and instructions for running the whole damap package (backend and frontend),
refer to the [damap-backend](https://github.com/damap-org/damap-backend) project.

## Damap Frontend

This repository contains the source code for the frontend of DAMAP and needs to be run
with [damap-backend](https://github.com/damap-org/damap-backend).
The project is based on [Angular](https://angular.io/) and uses the standard Angular CLI as a build system.

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload
if you change any of the source files.

### Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. For a production build, use `--configuration=production`.

### Running unit tests

Run `npm test` to execute the unit tests for the application.

### Running end-to-end tests

Playwright e2e tests start the Angular dev server automatically, but they require the real local backend stack to already be running:

- Quarkus dev backend at `http://localhost:8080`
- Keycloak realm `damap` at `http://localhost:8087`

Run `npm run e2e:install` once to install Chromium and its dependencies. Then run `npm run e2e` for the default headless Chromium suite, `npm run e2e:headed` for a visible browser, or `npm run e2e:ui` for Playwright UI mode.

The default login credentials are `admin` / `admin`. Override them with `DAMAP_E2E_USERNAME` and `DAMAP_E2E_PASSWORD`.

### Run the project with docker

For running the project in conjunction with the backend in a dockerized setup or on kubernetes,
please refer to the [damap-backend](https://github.com/tuwien-csd/damap-backend) project.
