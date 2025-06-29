FROM node:18

WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package.json ./
RUN npm install

# Копируем остальные файлы приложения
COPY . ./

# Собираем production-версию приложения
RUN npm run build

# Устанавливаем простой сервер для раздачи статики
RUN npm install -g serve

EXPOSE 5000

# Запускаем сервер для папки build
CMD ["serve", "-s", "build"]
