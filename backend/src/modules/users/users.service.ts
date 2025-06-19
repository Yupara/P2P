import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userDto: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async update(id: string, updateDto: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateDto);
    return this.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
