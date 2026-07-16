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

ARG GATEWAY_URL
RUN test -n "$GATEWAY_URL" || { echo "build arg GATEWAY_URL missing" >&2; exit 1; }

COPY --chown=node:node . .

RUN npm run build


FROM nginx:alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

