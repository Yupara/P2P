FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json из папки frontend
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы фронта
COPY frontend/. .

# Собираем проект
RUN npm run build

# Устанавливаем serve для раздачи статики
RUN npm install -g serve

EXPOSE 3000

# Запускаем готовый фронтенд
CMD ["serve", "-s", "build", "-l", "3000"]
