FROM node:20-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
ARG project
COPY --from=build /app/dist/$project/browser /usr/share/nginx/html
EXPOSE 80
