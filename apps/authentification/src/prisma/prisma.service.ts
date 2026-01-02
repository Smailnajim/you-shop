import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.AUTH_DATABASE_URL,
        },
      },
    } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
