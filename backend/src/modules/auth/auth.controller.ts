import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: {email: string, password: string}) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: {email: string, password: string, phone?: string}) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async getMe(@Request() req) {
    return req.user;
  }
}
