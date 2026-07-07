# syntax=docker/dockerfile:1
# escape=\
# check=error=true

FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM builder AS dev

COPY . .

USER node

CMD ["npm", "run", "dev"]

FROM nginx:alpine AS prod