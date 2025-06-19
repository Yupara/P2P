import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getAll(@Query() query) {
    // фильтры: asset, paymentSystem, type, minAmount, maxAmount
    const filters: any = {};
    if (query.asset) filters.asset = query.asset;
    if (query.paymentSystem) filters.paymentSystem = query.paymentSystem;
    if (query.type) filters.type = query.type;
    return this.ordersService.findAllActive(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyOrders(@Request() req) {
    return this.ordersService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    return this.ordersService.create(body, { id: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.ordersService.deactivate(id);
  }
}
