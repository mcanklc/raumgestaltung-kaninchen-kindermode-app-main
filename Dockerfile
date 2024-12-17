FROM node:gallium-alpine as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:gallium-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.output ./
ENV PORT 8080
ENV HOST 0.0.0.0
ENV API_URL https://staging-api.jrvs.de/v2/kaninchen
ENV FILES_HOST staging-files.jrvs.de
EXPOSE 8080
CMD node server/index.mjs
