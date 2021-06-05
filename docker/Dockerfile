# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
ARG env=prod
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# RUN npm run build
COPY . .

# production stage
FROM webdevops/nginx:alpine as production-stage
ENV WEB_DOCUMENT_ROOT /var/www/html
ENV WEB_DOCUMENT_INDEX index.html
ENV ACCEPT_EULA y

# Set workdir
WORKDIR /var/www/html
COPY ./docker/10-location-root.conf ./10-location-root.conf
COPY --from=build-stage /app/dist/home-dashboard-client /var/www/html
