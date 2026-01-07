import { Injectable } from '@nestjs/common';
// import { Roles } from './enum/roles';
import { Prisma, Users } from './generated/prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findUserByEmail(email: string) {
    console.log('eemail', email);
    const user = await this.prisma.users.findUnique({
      where: { email },
      include: { role: true },
    });

    console.log('user', user);
    if (!user) return null;
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
      where: { name: 'client' },
    });
    if (existingRole) return existingRole;
    return await this.prisma.roles.create({
      data: { name: 'client' },
    });
  }
}
