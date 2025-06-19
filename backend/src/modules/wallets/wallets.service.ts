import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

  async findByUser(userId: string) {
    return this.walletsRepository.find({ where: { user: { id: userId } } });
  }

  async findOrCreate(user: User, asset: string) {
    let wallet = await this.walletsRepository.findOne({
      where: { user: { id: user.id }, asset },
    });
    if (!wallet) {
      wallet = this.walletsRepository.create({ user, asset, balance: 0 });
      wallet = await this.walletsRepository.save(wallet);
    }
    return wallet;
  }

  async updateBalance(walletId: string, amount: number) {
    const wallet = await this.walletsRepository.findOne({ where: { id: walletId } });
    wallet.balance = Number(wallet.balance) + Number(amount);
    return this.walletsRepository.save(wallet);
  }
}
