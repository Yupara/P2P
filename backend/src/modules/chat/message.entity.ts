import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Deal } from '../deals/deal.entity';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Deal, (deal) => deal.id)
  deal: Deal;

  @ManyToOne(() => User, (user) => user.id)
  sender: User;

  @Column()
  text: string;

  @Column({ default: false })
  isSupport: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
