# Stage 1: сборка фронтенда
FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и ставим зависимости
COPY package.json ./
RUN npm install

# Копируем весь исходник и собираем
COPY . .  
RUN npm run build

# Stage 2: отдача статики через nginx
FROM nginx:alpine
# Удалим дефолтный конфиг (не обязательно)
RUN rm /etc/nginx/conf.d/default.conf

# Копируем собранный билд
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
