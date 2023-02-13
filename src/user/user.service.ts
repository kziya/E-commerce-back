import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';

import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUser(where: Partial<user>) {
    return this.userRepository.findOne(where);
  }
}
