import {Injectable} from "@nestjs/common";
import {PrismaClient, user} from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaClient: PrismaClient) {}
    async findOneById(id: number){
        return  this.prismaClient.user.findFirst({ where: { id } });
    }
}