import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('disputes')
export class DisputesController {
  constructor(private disputesService: DisputesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    // body: { dealId, reason, evidenceScreenshotUrl, evidenceVideoUrl }
    return this.disputesService.create(
      { id: body.dealId } as any,
      { id: req.user.userId } as any,
      body.reason,
      body.evidenceScreenshotUrl,
      body.evidenceVideoUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-deal/:dealId')
  async getByDeal(@Param('dealId') dealId: string) {
    return this.disputesService.findByDeal(dealId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/resolve')
  async resolve(@Param('id') id: string, @Body() body) {
    return this.disputesService.resolve(id, body.status);
  }
}
