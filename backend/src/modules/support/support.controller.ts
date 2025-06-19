import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('support')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    // body: { text }
    return this.supportService.create(
      { id: req.user.userId } as any,
      body.text,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/operator')
  async markOperator(@Param('id') id: string) {
    return this.supportService.markOperator(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/close')
  async close(@Param('id') id: string) {
    return this.supportService.close(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('open')
  async getOpen() {
    return this.supportService.getOpenTickets();
  }
}
