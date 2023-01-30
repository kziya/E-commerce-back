import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  hash() {}
  verify() {}
}
