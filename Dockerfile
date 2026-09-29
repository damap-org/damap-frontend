# syntax=docker/dockerfile:1

# Create a first stage container to build the application, this container image will be dropped once
# the runner is built
FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies separately so source changes can reuse this layer.
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# create a second container running a webserver and holding the built frontend application
FROM nginxinc/nginx-unprivileged:1-alpine-slim AS runner

# Metadata annotations as defined by the Open Container Initiative:
# https://github.com/opencontainers/image-spec/blob/main/annotations.md
LABEL org.opencontainers.image.title="DAMAP-frontend" \
    org.opencontainers.image.description="DAMAP is a tool that aims to facilitate the creation of data management plans (DMPs) for researchers." \
    org.opencontainers.image.url="https://github.com/damap-org/damap-frontend" \
    org.opencontainers.image.source="https://github.com/damap-org/damap-frontend" \
    org.opencontainers.image.documentation="https://github.com/damap-org/damap-frontend/blob/next/README.md" \
    org.opencontainers.image.vendor="Technische Universität Wien" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.authors="DAMAP Development Team" \
    org.opencontainers.image.base.name="nginxinc/nginx-unprivileged:1-alpine-slim"

COPY docker/conf.d/* /etc/nginx/conf.d

COPY --from=deps --chown=1001:0 /app/dist/damap-frontend/browser/ /usr/share/nginx/html/
