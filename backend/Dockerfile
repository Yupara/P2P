# Используем официальный образ nginx для продакшена статических файлов
FROM node:18 AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Ставим зависимости
RUN npm install

# Копируем исходники и билдим проект
COPY . .
RUN npm run build

# Второй этап — минимальный nginx для отдачи билда
FROM nginx:1.24

# Копируем билд из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
