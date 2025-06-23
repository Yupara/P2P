import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
// Импортируй остальные модули если нужно

@Module({
  imports: [
    OffersModule,
    // Другие модули
  ],
})
export class AppModule {}
