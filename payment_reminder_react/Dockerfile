# payment_reminder_react/Dockerfile
# Stage 1: Build the React app for AMD64
FROM node:16-alpine AS build-amd64

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React app with nginx for AMD64
FROM nginx:alpine AS serve-amd64

COPY --from=build-amd64 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Build the React app for ARM64
FROM node:16-alpine AS build-arm64

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 4: Serve the React app with nginx for ARM64
FROM nginx:alpine AS serve-arm64

COPY --from=build-arm64 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
