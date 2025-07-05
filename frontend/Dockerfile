# Stage 1: сборка фронтенда
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: отдача статики через nginx
FROM nginx:alpine
# удалим дефолтный конфиг, если нужно
RUN rm /etc/nginx/conf.d/default.conf

# копируем билд приложения
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
