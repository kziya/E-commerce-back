import {Injectable} from "@nestjs/common";
import {PrismaClient, user} from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaClient: PrismaClient) {}
    async findOne(){
        const a = await this.prismaClient.user.findFirst({
            where: {

            },
            include: {
                orders: true
            }
        })

        return a;
    }
}