# Green P2P Exchange Admin Panel

## Запуск

1. Установить зависимости:
   ```
   cd admin
   npm install
   ```
2. Запустить:
   ```
   npm run dev
   ```
3. Откроется на http://localhost:3001 (или другой порт).

## Возможности

- Статистика (доход, активные пользователи)
- Просмотр и закрытие тикетов поддержки
- Управление пользователями (блокировка/разблокировка)
- Модерация и разрешение споров
- Мультиязык (RU/EN)
- Темно-зелёная тема

## Безопасность

- Доступ только по токену администратора (см. backend /admin)
