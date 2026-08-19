# syntax=docker/dockerfile:1
# escape=\
# check=error=true

FROM node:25-slim AS builder

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm ci

FROM builder AS dev

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]

FROM builder AS build

COPY --chown=node:node . .

RUN npm run build

FROM alpine:3.24 AS prod
# hadolint ignore=DL3018
RUN apk add --no-cache rsync

COPY --from=build /app/dist /dist

CMD ["rsync", "-a", "--delete", "/dist/", "/out/"]
