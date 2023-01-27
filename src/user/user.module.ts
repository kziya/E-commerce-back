import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import {UserRepository} from "./user.repository";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository],
})
export class UserModule {}
