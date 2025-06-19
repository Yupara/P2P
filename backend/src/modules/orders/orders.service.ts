import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(orderDto: Partial<Order>, user: User) {
    const order = this.ordersRepository.create({ ...orderDto, user });
    return this.ordersRepository.save(order);
  }

  async findAllActive(filters?: any) {
    return this.ordersRepository.find({
      where: { isActive: true, ...filters },
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string) {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deactivate(orderId: string) {
    await this.ordersRepository.update(orderId, { isActive: false });
    return this.ordersRepository.findOne({ where: { id: orderId } });
  }
}
