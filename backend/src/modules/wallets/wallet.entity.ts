import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  asset: string; // BTC, ETH, USDT, RUB, USD, EUR, QIWI, etc.

  @Column({ type: 'decimal', default: 0, precision: 18, scale: 8 })
  balance: number;

  @Column({ default: true })
  isActive: boolean;
}
