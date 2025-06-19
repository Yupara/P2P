import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './deal.entity';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealsRepository: Repository<Deal>,
  ) {}

  async create(order: Order, buyer: User, seller: User, amount: number, buyerFee: number, sellerFee: number) {
    const deal = this.dealsRepository.create({
      order,
      buyer,
      seller,
      amount,
      status: 'WAIT_PAYMENT',
      buyerFee,
      sellerFee,
    });
    return this.dealsRepository.save(deal);
  }

  async findByUser(userId: string) {
    return this.dealsRepository.find({
      where: [
        { buyer: { id: userId } },
        { seller: { id: userId } },
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(dealId: string, status: string) {
    await this.dealsRepository.update(dealId, { status });
    return this.dealsRepository.findOne({ where: { id: dealId } });
  }
}
