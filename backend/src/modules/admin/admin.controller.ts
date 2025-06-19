import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  // Пример защищённых эндпоинтов для личного кабинета админа

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    if (!req.user.isAdmin) throw new Error('Forbidden');
    return req.user;
  }

  // Добавляется далее: вывод статистики, список тикетов, управление пользователями и спорными сделками и т.д.
}
