FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./      # Сначала копируем package.json
RUN npm install                              # Устанавливаем зависимости

COPY . .                                     # Теперь копируем остальные файлы
RUN npm run build                            # Собираем проект

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
