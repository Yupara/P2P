# Stage 1: сборка приложения
FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и package-lock.json, ставим зависимости
COPY package*.json ./
RUN npm install

# Копируем весь исходник и собираем production-бандл
COPY . .
RUN npm run build

# Stage 2: запускаем nginx для отдачи статики
FROM nginx:alpine
# Удаляем дефолтную конфигурацию nginx, если нужно
RUN rm /etc/nginx/conf.d/default.conf
# Копируем свой конфиг (опционально)
COPY nginx.conf /etc/nginx/conf.d/
# Отдаём сабдиректорию build из этапа сборки
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
