# Инструкция по деплою Green P2P Exchange

## 1. Backend (NestJS)

### Локально

1. Перейти в папку `backend`
2. Заполнить `.env` на основе `.env.example` (или скопировать: `cp .env.example .env`)
3. Установить зависимости:
   ```
   npm install
   ```
4. Запустить PostgreSQL (например, через Docker или локально)
5. Запустить backend:
   ```
   npm run start:dev
   ```
   или через Docker:
   ```
   docker-compose up --build
   ```

### На сервере (production)

- Использовать Docker Compose (рекомендуется)
- Настроить все переменные окружения (`.env`)
- Открыть порт 4000 для API

## 2. Frontend (Next.js)

1. Перейти в папку `frontend`
2. Установить зависимости:
   ```
   npm install
   ```
3. Запуск в development:
   ```
   npm run dev
   ```
4. Для production:
   ```
   npm run build
   npm run start
   ```
5. По умолчанию сайт на http://localhost:3000

**API-эндпоинты**: если frontend и backend на одном сервере — можно использовать прокси.  
В файле `next.config.js` можно добавить:
```js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:4000/:path*'
    }
  ];
}
```

## 3. Admin Panel (Next.js)

1. Перейти в папку `admin`
2. Установить зависимости:
   ```
   npm install
   ```
3. Запуск:
   ```
   npm run dev
   ```
4. Production:
   ```
   npm run build
   npm run start
   ```

## 4. Docker Compose (полный стек)

Из корня проекта (где `docker-compose.yml`):

```
docker-compose up --build
```

- Откроются сервисы:  
  - Backend: http://localhost:4000  
  - База данных: localhost:5432

## 5. CI/CD

Можно использовать GitHub Actions, Vercel, Heroku или любой VPS.  
Пример workflow для backend:

```yaml
name: Deploy Backend

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm install && npm run build
      # Добавить деплой или push в Docker Registry
```

---

## 6. Безопасность

- Обязательно меняйте все пароли и секреты перед публикацией!
- Доступ к админке — только через авторизацию администратора (JWT).
- Доступ к prod-версии только по HTTPS.
- Фаервол для базы данных (открыта только для backend).

---

## 7. Дополнительно

- Для интеграций с платёжными системами нужны API-ключи.
- Для email/SMS/Telegram — зарегистрируйте сервисы и укажите ключи в `.env`.
- Для крипто-кошельков — подключайте свои RPC/интеграции.

---

## Готово!  
Вопросы или нужна помощь по отдельным интеграциям — напишите.
