import { Injectable } from '@nestjs/common';

@Injectable()
export class ReferralService {
  getReferralReward(fee: number): number {
    return Math.round(fee * 0.2 * 100000000) / 100000000; // 20% от комиссии
  }
}
