import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DealsModule } from './modules/deals/deals.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { FeesService } from './modules/fees/fees.service';
import { ReferralService } from './modules/referral/referral.service';
import { DisputesModule } from './modules/disputes/disputes.module';
import { ChatModule } from './modules/chat/chat.module';
import { SupportModule } from './modules/support/support.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';
import { StatsModule } from './modules/stats/stats.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // На проде false
    }),
    UsersModule,
    AuthModule,
    WalletsModule,
    OrdersModule,
    DealsModule,
    PaymentsModule,
    DisputesModule,
    ChatModule,
    SupportModule,
    NotificationsModule,
    TelegramBotModule,
    StatsModule,
    AdminModule,
  ],
  providers: [FeesService, ReferralService],
})
export class AppModule {}
