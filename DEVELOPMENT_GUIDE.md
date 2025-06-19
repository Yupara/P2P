# Руководство для разработчиков Green P2P Exchange

## 1. Архитектура

- **Backend**: NestJS (TypeScript), PostgreSQL, TypeORM, модульная структура (users, orders, deals, payments и т.д.)
- **Frontend**: Next.js (TypeScript), мультиязычность, тёмно-зелёный UI
- **Admin Panel**: Next.js, отдельный проект с доступом только для админов
- **Интеграции**: Stripe, YooKassa, Telegram Bot, email/SMS уведомления, поддержка новых платёжных систем

## 2. Как добавить новый модуль

1. **Создайте папку** в `backend/src/modules/<newmodule>`
2. **Создайте entity**, service, controller, module файлы.
3. **Добавьте модуль** в `app.module.ts` (imports).
4. **Пример**:
    - `example.entity.ts`
    - `example.service.ts`
    - `example.controller.ts`
    - `example.module.ts`

## 3. Новые эндпоинты

- Добавляйте в controller соответствующего модуля.
- Используйте DTO для валидации (class-validator).
- Для защиты используйте `@UseGuards(JwtAuthGuard)`.

## 4. Добавление платёжных систем

- В `payments.service.ts` реализуйте методы для интеграции с API платёжной системы.
- В `.env` добавьте нужные ключи.
- Добавьте роут в payments.controller.ts для вызова вашей интеграции.

## 5. Frontend/Админка

- Все страницы — в папке `pages/`.
- Локализация — через `src/i18n/index.ts`.
- Для новых страниц: создайте файл в `pages/`, добавьте ссылки в меню.
- Для интеграции с backend используйте fetch к `/api/` (через прокси или переменную окружения).

## 6. Работа с базой данных

- Схема описывается через entity-файлы (TypeORM).
- Для production рекомендовано отключать `synchronize: true`, использовать миграции.
- Миграции: `typeorm migration:generate`, `typeorm migration:run`.

## 7. Безопасность

- Все защищённые эндпоинты — только под JWT.
- Админка — только для пользователей с `isAdmin: true`.
- Не хранить секреты в git! Используйте `.env`.

## 8. Тесты

- Добавляйте unit-тесты для сервисов (Jest, встроен в NestJS).
- Интеграционные тесты: можно использовать Postman/newman, Supertest.

## 9. CI/CD

- Для автосборки используйте GitHub Actions (см. DEPLOY.md).
- Для продакшн-сервера используйте Docker Compose.

## 10. Документация

- Описывайте новые API-методы в README или отдельном docs.md.
- Для OpenAPI/Swagger: используйте `@nestjs/swagger` (легко добавить в main.ts).

---

## Пример создания нового модуля

1. Создайте папку `src/modules/kyc`
2. Создайте файлы:
    - `kyc.entity.ts`
    - `kyc.service.ts`
    - `kyc.controller.ts`
    - `kyc.module.ts`
3. В `app.module.ts` добавьте импорт: `KycModule`
4. Опишите entity и методы:
    - KYC-статус, верификация документов, интеграция с KYC-провайдером

---

## Советы

- Соблюдайте единую структуру кода (примеры — в имеющихся модулях).
- Все изменения покрывайте тестами.
- Не забывайте про мультиязык во frontend/admin.
- Для production — всегда используйте HTTPS и секреты из переменных окружения.

---

## Вопросы и поддержка

- Для обсуждения архитектуры, кода и новых идей используйте Issues/Discussions в репозитории.
- Для аудита безопасности и кастомных интеграций обращайтесь к авторам/разработчикам.
