# syntax=docker/dockerfile:1

# Create a first stage container to build the application, this container image will be dropped once
# the runner is built
FROM trion/ng-cli:18.0.3 AS deps

# This Dockerfile uses labels from the label-schema namespace from http://label-schema.org/rc1/
LABEL maintainer="clara.schuster@tuwien.ac.at" \
    org.label-schema.name="DAMAP-frontend" \
    org.label-schema.description="DAMAP is a tool that aims to facilitate the creation of data management plans (DMPs) for researchers." \
    org.label-schema.usage="https://github.com/tuwien-csd/damap-frontend/tree/master/README.md" \
    org.label-schema.vendor="Technische Universität Wien" \
    org.label-schema.url="https://github.com/tuwien-csd/damap-frontend" \
    org.label-schema.vcs-url="https://github.com/tuwien-csd/damap-frontend" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run -d -p 8080:8080 damap"

COPY package.json package-lock.json /app/

COPY . /app

# angular-cli is installed locally, thus we point PATH to its binary folder
ENV PATH="$PATH:/app/node_modules/@angular/cli/bin/"

# install and build the application on the builder container
RUN npm install --ignore-scripts -g "nx@19.3.0"
RUN npm ci --ignore-scripts
RUN npx nx build damap-frontend

ARG APP=damap-frontend

# create a second container running a webserver and holding the built frontend application
FROM nginxinc/nginx-unprivileged AS runner
ADD docker/conf.d/* /etc/nginx/conf.d

COPY --from=deps --chown=1001:0 /app/dist/apps/damap-frontend/ /usr/share/nginx/html/
