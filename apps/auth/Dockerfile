FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

CMD ["pnpm", "start:dev", "auth"]