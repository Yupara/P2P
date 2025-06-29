FROM node:18

WORKDIR /app

# Копируем только package.json для установки зависимостей
COPY frontend/package.json ./
RUN npm install

# Копируем все остальные файлы проекта
COPY frontend/ ./

# Собираем production-версию React-приложения
RUN npm run build

# Устанавливаем простой HTTP-сервер для отдачи статики
RUN npm install -g serve

EXPOSE 5000

# Запускаем сервер на порту 5000
CMD ["serve", "-s", "build"]
