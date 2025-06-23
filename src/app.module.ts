import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
// ... другие импорты

@Module({
  imports: [
    OffersModule,
    // ... другие модули
  ],
  // ... остальное
})
export class AppModule {}
