# Green P2P Exchange — API Reference

## Аутентификация

### POST /api/auth/register

Регистрация нового пользователя.

**Body:**
```json
{
  "email": "user@mail.com",
  "password": "string",
  "phone": "string"
}
```

### POST /api/auth/login

Вход пользователя.

**Body:**
```json
{
  "email": "user@mail.com",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token"
}
```

---

## Пользователь

### GET /api/users/me

Получить данные текущего пользователя (JWT required).

---

## Кошелёк

### GET /api/wallets/my

Список кошельков и балансов пользователя.

---

## Ордеры

### GET /api/orders/my

Список личных ордеров.

### POST /api/orders

Создать новый ордер.

**Body:**
```json
{
  "asset": "USDT",
  "paymentSystem": "QIWI",
  "price": 99.5,
  "amount": 1200,
  "type": "BUY"
}
```

---

## Сделки

### GET /api/deals/my

Список личных сделок.

### POST /api/deals

Создать сделку по ордеру.

**Body:**
```json
{
  "orderId": "uuid",
  "amount": 500
}
```

---

## Платежи

### POST /api/payments/stripe

Создать платёж через Stripe.

**Body:**
```json
{
  "amount": 100,
  "currency": "USD"
}
```

---

## Чат

### GET /api/chat/messages/:dealId

Получить сообщения по сделке.

### POST /api/chat/send

**Body:**
```json
{
  "dealId": "uuid",
  "text": "Hello"
}
```

---

## Поддержка

### POST /api/support

Создать тикет.

**Body:**
```json
{
  "text": "I need help"
}
```

### GET /api/support/open

Открытые тикеты (для админа).

---

## Споры

### POST /api/disputes

Открыть спор по сделке.

**Body:**
```json
{
  "dealId": "uuid",
  "reason": "Problem",
  "evidenceScreenshotUrl": "https://...",
  "evidenceVideoUrl": "https://..."
}
```

### PATCH /api/disputes/:id/resolve

Решить спор (админ).

---

## Статистика (админ)

### GET /api/stats/daily-earnings

Доход за день.

### GET /api/stats/active-users

Число активных пользователей за 24ч.

---

## Пользователи (админ)

### GET /api/users

Список пользователей.

### PATCH /api/users/:id/block

Заблокировать пользователя.

### PATCH /api/users/:id/unblock

Разблокировать пользователя.

---

## Прочее

- Все приватные эндпоинты требуют JWT в заголовке `Authorization: Bearer <token>`.
- Для админ-операций пользователь должен иметь `isAdmin: true`.

---

## Swagger

Для генерации OpenAPI/Swagger документации можно добавить пакет `@nestjs/swagger` и аннотации к контроллерам.

---

## Вопросы

Для нестандартных сценариев и расширения API — пишите в поддержку или создайте issue.
