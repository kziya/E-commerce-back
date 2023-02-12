import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { user } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findUser(where: Partial<user>) {
    return this.userRepository.findOne(where);
  }
}
