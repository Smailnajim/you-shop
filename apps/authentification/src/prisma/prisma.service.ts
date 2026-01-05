import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    if (process.env.AUTH_DATABASE_URL) {
      process.env.DATABASE_URL = process.env.AUTH_DATABASE_URL;
    }

    const connectionString =
      process.env.AUTH_DATABASE_URL ?? process.env.DATABASE_URL;
    if (connectionString) {
      process.env.DATABASE_URL = connectionString;
    }

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? '',
    });
    super({ adapter } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
