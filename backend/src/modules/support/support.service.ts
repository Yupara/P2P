import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './support.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private ticketsRepository: Repository<SupportTicket>,
  ) {}

  async create(user: User, text: string) {
    const ticket = this.ticketsRepository.create({ user, text, status: 'OPEN' });
    return this.ticketsRepository.save(ticket);
  }

  async markOperator(ticketId: string) {
    return this.ticketsRepository.update(ticketId, { status: 'OPERATOR', isOperator: true });
  }

  async close(ticketId: string) {
    return this.ticketsRepository.update(ticketId, { status: 'CLOSED' });
  }

  async getOpenTickets() {
    return this.ticketsRepository.find({ where: { status: 'OPEN' } });
  }
}
