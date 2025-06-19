import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Between } from 'typeorm';
import { Deal } from '../deals/deal.entity';
import { User } from '../users/user.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Deal)
    private dealsRepository: Repository<Deal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getDailyEarnings(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const deals = await this.dealsRepository.find({
      where: {
        createdAt: Between(start, end),
        status: 'RELEASED',
      },
    });

    const totalFees = deals.reduce((sum, d) => sum + Number(d.buyerFee) + Number(d.sellerFee), 0);
    return totalFees;
  }

  async getActiveUsers() {
    // Активные за последние 24 часа
    const since = new Date();
    since.setDate(since.getDate() - 1);
    return this.usersRepository.count({ where: { updatedAt: MoreThan(since) } });
  }

  async getUserStats(userId: string) {
    const dealsCount = await this.dealsRepository.count({
      where: [
        { buyer: { id: userId } },
        { seller: { id: userId } },
      ],
      status: 'RELEASED',
    });
    return { dealsCount };
  }
}
