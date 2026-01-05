import { Injectable } from '@nestjs/common';
import { Roles } from './enum/roles';
import { Prisma, User } from './generated/prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async findOrCreateDefaultRole() {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: Roles.defaultRole ?? 'client' },
    });
    if (existingRole) return existingRole;
    return await this.prisma.role.create({
      data: { name: Roles.defaultRole ?? 'client' },
    });
  }
}
