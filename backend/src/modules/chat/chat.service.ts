import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Deal } from '../deals/deal.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async sendMessage(deal: Deal, sender: User, text: string, isSupport = false) {
    const message = this.messagesRepository.create({
      deal,
      sender,
      text,
      isSupport,
    });
    return this.messagesRepository.save(message);
  }

  async getMessages(dealId: string) {
    return this.messagesRepository.find({
      where: { deal: { id: dealId } },
      order: { createdAt: 'ASC' },
    });
  }
}
