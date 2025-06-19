# Используем официальный Node.js образ для production
FROM node:20-alpine

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальные исходники проекта
COPY . .

# Собираем проект (если TypeScript/NestJS)
RUN npm run build

# Указываем порт (замените при необходимости)
EXPOSE 4000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
