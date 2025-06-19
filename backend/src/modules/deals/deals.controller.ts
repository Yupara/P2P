import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyDeals(@Request() req) {
    return this.dealsService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    // body: { orderId, sellerId, amount, buyerFee, sellerFee }
    // buyerId = req.user.userId
    // (интеграция с сервисом ордеров и пользователей должна быть)
    // Здесь только заглушка!
    return { message: 'Not implemented' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body) {
    return this.dealsService.updateStatus(id, body.status);
  }
}
