FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Копируем ВСЕ исходники и конфиги, включая tsconfig.json!
COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]
