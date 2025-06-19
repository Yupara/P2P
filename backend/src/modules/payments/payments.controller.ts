import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('stripe')
  async stripe(@Body() body, @Request() req) {
    return this.paymentsService.createStripePayment(body.amount, body.currency, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yookassa')
  async yookassa(@Body() body, @Request() req) {
    return this.paymentsService.createYooKassaPayment(body.amount, body.currency, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('other')
  async other(@Body() body, @Request() req) {
    return this.paymentsService.createOtherPayment(body.system, body.amount, body.currency, req.user.userId);
  }
}
