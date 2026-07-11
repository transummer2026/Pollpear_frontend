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

FROM nginx:alpine AS prod
