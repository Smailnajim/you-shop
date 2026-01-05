import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './../generated/prisma/client';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    console.log(process.env['AUTH_DATABASE_URL']);
    const adapter = new PrismaPg({
      connectionString: process.env['AUTH_DATABASE_URL'],
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
