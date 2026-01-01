import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-catalogue';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.CATALOGUE_DATABASE_URL,
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
