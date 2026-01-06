import { Injectable } from '@nestjs/common';
import { Roles } from './enum/roles';
import { Prisma, Users } from './generated/prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<Users | false> {
    console.log('eemail', email);
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    console.log('user', user);
    if (!user) return false;
    return user;
  }

  async createUser(userData: Prisma.UsersCreateInput): Promise<Users> {
    return await this.prisma.users.create({
      data: userData,
    });
  }

  async findOrCreateDefaultRole() {
    console.log('findOrCreateDefaultRole\n');
    const existingRole = await this.prisma.roles.findUnique({
      where: { name: Roles.defaultRole ?? 'client' },
    });
    if (existingRole) return existingRole;
    return await this.prisma.roles.create({
      data: { name: Roles.defaultRole ?? 'client' },
    });
  }
}
