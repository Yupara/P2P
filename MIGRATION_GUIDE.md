# Руководство по миграциям базы данных (Database Migration Guide)

## 1. Для разработки (dev)

- В dev-режиме обычно используется TypeORM с `synchronize: true` (создаёт и обновляет таблицы автоматически).
- Для production использовать **только миграции**!

## 2. Генерация миграций (TypeORM CLI)

1. Проверьте конфиг подключения к БД в `ormconfig.js` или `app.module.ts`
2. Внесите изменения в entity-файлы (`.entity.ts`)
3. Сгенерируйте новую миграцию:
   ```
   npx typeorm migration:generate -n <MigrationName>
   ```
   или через npm-скрипт:
   ```
   npm run typeorm migration:generate -- -n <MigrationName>
   ```

4. Миграция появится в папке `src/migrations/` или `dist/migrations/` (путь зависит от настроек).

## 3. Запуск миграций

- После сборки проекта (или в docker-compose), примените миграции:
   ```
   npx typeorm migration:run
   ```
   или
   ```
   npm run typeorm migration:run
   ```

- Для отката последней миграции:
   ```
   npx typeorm migration:revert
   ```

## 4. Важно для production

- В `.env` выставьте `TYPEORM_SYNCHRONIZE=false`
- Используйте миграции для любого изменения схемы БД
- Храните миграции под версионным контролем (git)

## 5. Пример миграции

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKycStatusToUser1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "kycStatus" varchar DEFAULT 'PENDING'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "kycStatus"`);
  }
}
```

## 6. Troubleshooting

- Если миграции не применяются — проверьте конфиг подключения и права пользователя к БД.
- После конфликтов миграций — проверьте порядок и уникальность timestamp в именах файлов.

---

## Для Sequelize или других ORM

- Принципы аналогичны: используйте cli-генерацию миграций, храните их в git, применяйте на сервере при деплое.

---

## Вопросы

Если нужна помощь с миграциями или переходом в production — обращайтесь через Issues или support@greenp2p.com.
