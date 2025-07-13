# Этап 1: Установка зависимостей
FROM node:16 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Копируем все файлы из текущей директории в контейнер
COPY . ./

# Запуск сборки
RUN npm run build

# Этап 2: Отдача статики через nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
