import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log(exception);
    switch (exception.code) {
      // not found record
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Not Found !',
        });
        break;
      default:
        throw new InternalServerErrorException();
    }
  }
}
