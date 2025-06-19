import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('daily-earnings')
  async dailyEarnings(@Request() req) {
    // Только для админа
    if (!req.user.isAdmin) throw new Error('Forbidden');
    return this.statsService.getDailyEarnings(new Date());
  }

  @UseGuards(JwtAuthGuard)
  @Get('active-users')
  async activeUsers(@Request() req) {
    if (!req.user.isAdmin) throw new Error('Forbidden');
    return this.statsService.getActiveUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async userStats(@Request() req) {
    return this.statsService.getUserStats(req.user.userId);
  }
}
