import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  text: string;

  @Column({ default: false })
  isOperator: boolean;

  @Column({ default: 'OPEN' })
  status: string; // OPEN, OPERATOR, CLOSED

  @CreateDateColumn()
  createdAt: Date;
}
