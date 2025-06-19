import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './disputes.entity';
import { Deal } from '../deals/deal.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DisputesService {
  constructor(
    @InjectRepository(Dispute)
    private disputesRepository: Repository<Dispute>,
  ) {}

  async create(deal: Deal, initiator: User, reason: string, evidenceScreenshotUrl?: string, evidenceVideoUrl?: string) {
    const dispute = this.disputesRepository.create({
      deal,
      initiator,
      reason,
      evidenceScreenshotUrl,
      evidenceVideoUrl,
      status: 'OPEN',
    });
    return this.disputesRepository.save(dispute);
  }

  async findByDeal(dealId: string) {
    return this.disputesRepository.find({
      where: { deal: { id: dealId } },
      order: { createdAt: 'DESC' },
    });
  }

  async resolve(disputeId: string, status: string) {
    await this.disputesRepository.update(disputeId, { status });
    return this.disputesRepository.findOne({ where: { id: disputeId } });
  }
}
