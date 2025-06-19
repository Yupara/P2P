import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyWallets(@Request() req) {
    return this.walletsService.findByUser(req.user.userId);
  }
}
