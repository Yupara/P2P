import { Controller, Post, Body } from '@nestjs/common';

interface UserDto {
  username: string;
  password: string;
}

const users: UserDto[] = [];

@Controller('auth')
export class UsersController {
  @Post('register')
  register(@Body() body: UserDto) {
    if (users.find(u => u.username === body.username)) {
      return { success: false, message: 'User already exists' };
    }
    users.push(body);
    return { success: true, message: 'Registered' };
  }

  @Post('login')
  login(@Body() body: UserDto) {
    const user = users.find(u => u.username === body.username && u.password === body.password);
    if (user) return { success: true, token: 'demo-token-' + user.username };
    return { success: false, message: 'Invalid credentials' };
  }
}
