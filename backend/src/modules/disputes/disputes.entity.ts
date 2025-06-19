import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Deal } from '../deals/deal.entity';
import { User } from '../users/user.entity';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Deal, (deal) => deal.id)
  deal: Deal;

  @ManyToOne(() => User, (user) => user.id)
  initiator: User;

  @Column()
  reason: string;

  @Column({ nullable: true })
  evidenceScreenshotUrl: string;

  @Column({ nullable: true })
  evidenceVideoUrl: string;

  @Column({ default: 'OPEN' })
  status: string; // OPEN, RESOLVED, REJECTED

  @CreateDateColumn()
  createdAt: Date;
}
