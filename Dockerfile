ARG BASE_IMAGE=docker.io/node:20.9.0-alpine

#
# Build the application
#
FROM ${BASE_IMAGE} as application

ENV NO_UPDATE_NOTIFIER=true

RUN mkdir -p /.npm
RUN chown -R 1001:0 /.npm

USER 0
COPY --chown=1001:0 app /tmp/src/app
WORKDIR /tmp/src/app
USER 1001
RUN npm ci --omit=dev

#
# Build the frontend
#
FROM ${BASE_IMAGE} as frontend

ENV NO_UPDATE_NOTIFIER=true

RUN mkdir -p /.npm
RUN chown -R 1001:0 /.npm

USER 0
COPY --chown=1001:0 app/frontend /tmp/src/app/frontend

WORKDIR /tmp/src/app/frontend
USER 1001

RUN npm ci && npm run build

#
# Create the final container image
#
FROM ${BASE_IMAGE}

ENV APP_PORT=8080 \
    NO_UPDATE_NOTIFIER=true

RUN mkdir -p /.npm
RUN chown -R 1001:0 /.npm

COPY --from=application /tmp/src/app ${HOME}
COPY --from=frontend /tmp/src/app/frontend/dist ${HOME}/frontend/dist
COPY .git ${HOME}/.git
WORKDIR ${HOME}

EXPOSE ${APP_PORT}
CMD ["npm", "run", "start"]
