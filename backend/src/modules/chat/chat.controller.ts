import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async send(@Body() body, @Request() req) {
    // body: { dealId, text }
    return this.chatService.sendMessage(
      { id: body.dealId } as any,
      { id: req.user.userId } as any,
      body.text,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:dealId')
  async getMessages(@Param('dealId') dealId: string) {
    return this.chatService.getMessages(dealId);
  }
}
