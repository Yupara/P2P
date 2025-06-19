# 1. Build Stage (Node 18, for React+TypeScript)
FROM node:18 AS builder

WORKDIR /app

# Копируем только package.json и (если есть) package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные исходники
COPY . .

# Собираем фронт (если у вас create-react-app/react-scripts)
RUN npm run build

# 2. Production Stage (nginx для статики)
FROM nginx:alpine

# Копируем собранный билд во внутренний web root nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем кастомный nginx-конфиг (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
