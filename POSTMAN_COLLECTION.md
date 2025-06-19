# Postman коллекция — Примеры запросов для Green P2P Exchange

> Импортируйте этот JSON-файл в Postman для быстрого тестирования API

```json
{
  "info": {
    "name": "Green P2P Exchange API",
    "_postman_id": "12345678-9abc-def0-1234-56789abcdef0",
    "description": "Примеры запросов для тестирования основных эндпоинтов",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Регистрация пользователя",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"testuser@mail.com\",\n  \"password\": \"testpass\",\n  \"phone\": \"+79990001234\"\n}"
        },
        "url": { "raw": "http://localhost:4000/api/auth/register", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "auth", "register"] }
      }
    },
    {
      "name": "Вход в систему",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"testuser@mail.com\",\n  \"password\": \"testpass\"\n}"
        },
        "url": { "raw": "http://localhost:4000/api/auth/login", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "auth", "login"] }
      }
    },
    {
      "name": "Получить свои кошельки",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{jwt_token}}" }],
        "url": { "raw": "http://localhost:4000/api/wallets/my", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "wallets", "my"] }
      }
    },
    {
      "name": "Создать ордер",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"asset\": \"USDT\",\n  \"paymentSystem\": \"QIWI\",\n  \"price\": 99.5,\n  \"amount\": 1200,\n  \"type\": \"BUY\"\n}"
        },
        "url": { "raw": "http://localhost:4000/api/orders", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "orders"] }
      }
    },
    {
      "name": "Создать депозит через Stripe",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"amount\": 100,\n  \"currency\": \"USD\"\n}"
        },
        "url": { "raw": "http://localhost:4000/api/payments/stripe", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "payments", "stripe"] }
      }
    },
    {
      "name": "Открыть тикет поддержки",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"text\": \"I need help\"\n}"
        },
        "url": { "raw": "http://localhost:4000/api/support", "protocol": "http", "host": ["localhost"], "port": "4000", "path": ["api", "support"] }
      }
    }
  ],
  "variable": [
    { "key": "jwt_token", "value": "PASTE_YOUR_JWT_HERE" }
  ]
}
```
---

**Примечание:**  
Добавьте свой JWT-токен после авторизации в переменную `jwt_token` в Postman.

При необходимости расширяйте коллекцию под свои задачи!
