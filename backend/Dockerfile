# Используем официальный Node.js образ
FROM node:20-alpine

# Задаём рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальные исходники
COPY . .

# Собираем TypeScript (если используется)
RUN npm run build

# Указываем порт
EXPOSE 4000

# Запуск приложения
CMD ["npm", "run", "start:prod"]
