# Этап 1: Установка зависимостей
FROM node:16 AS builder

WORKDIR /app

# Копируем package.json
COPY package.json

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . ./

# Запускаем сборку
RUN npm run build

# Этап 2: Отдача статики через nginx
FROM nginx:alpine

# Копируем собранную статику из первого этапа в nginx
COPY --from=builder /app/build /usr/share/nginx/html
