# Деплой на Render.com — Green P2P Exchange

## 1. Backend (NestJS)

- Тип сервиса: **Web Service**
- Build Command:  
  ```
  npm install && npm run build
  ```
- Start Command:  
  ```
  npm run start:prod
  ```
- Environment:
  - **DATABASE_URL** (или все переменные из `.env`)
  - **JWT_SECRET**, **STRIPE_KEY** и остальные API-ключи
  - Важно: **NODE_ENV=production**

- Render автоматически создает Postgres-базу (можно через Render Dashboard).

## 2. Frontend (Next.js)

- Тип сервиса: **Web Service**
- Build Command:  
  ```
  npm install && npm run build
  ```
- Start Command:  
  ```
  npm start
  ```
- Environment:
  - **NEXT_PUBLIC_API_URL** — URL backend (например, https://your-backend.onrender.com)
  - Остальные переменные (если есть)

## 3. Admin Panel

- Аналогично frontend (можно как отдельный сервис).

## 4. База данных

- Создайте **PostgreSQL** через Render Dashboard.
- Получите строку подключения (`postgres://...`) и внесите её в `.env` (или переменную окружения Render).

## 5. Переменные окружения

- Не храните `.env` в git!  
- Все ключи и секреты указывайте через Render Dashboard → Environment.

## 6. Дополнительно

- Для миграций (`typeorm migration:run`) — можно сделать отдельную Render Job или запускать вручную при деплое.
- Для file storage (KYC и т.п.) — используйте S3-совместимые облака или Render Disk (ограничено).
- Для production обязательно включите HTTPS (Render по умолчанию даёт SSL).

## 7. Пример workflow

1. Создайте три web-сервиса: backend, frontend, admin.
2. Создайте БД PostgreSQL.
3. Пропишите переменные окружения.
4. Деплойте через GitHub или напрямую.
5. Проверьте логи и статус приложений.

---

**Вопросы по Render:**  
- Используйте поддержку Render или github issues репозитория.
