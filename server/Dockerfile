# server/Dockerfile
# Stage 1: Build for AMD64
FROM node:16-alpine AS build-amd64

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

# Stage 2: Build for ARM64
FROM --platform=linux/arm64 node:16-alpine AS build-arm64

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
