import { Injectable } from '@nestjs/common';

@Injectable()
export class FeesService {
  getFeeRate(dealsCount: number): number {
    if (dealsCount >= 50) return 0.0025; // 0.25%
    return 0.005; // 0.5%
  }

  calculateFee(amount: number, dealsCount: number): number {
    const rate = this.getFeeRate(dealsCount);
    return Math.round(amount * rate * 100000000) / 100000000;
  }
}
