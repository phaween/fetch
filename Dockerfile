FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

VOLUME /app/data

COPY --from=build /app/dist ./dist

# Use ENTRYPOINT to define the executable
ENTRYPOINT ["node", "dist/src/index.js"]