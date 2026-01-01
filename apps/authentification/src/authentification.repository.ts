import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client-auth';
import { RegisterDto } from './dto/register.dto';
import { Roles } from './enum/roles';

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

  async createUser(userData: RegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async findOrCreateDefaultRole(): Promise<Role> {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: Roles.defaultRole ?? "client" },
    });
    if (existingRole) return existingRole;
    return await this.prisma.role.create({
      data: { name: Roles.defaultRole ?? "client" },
    });
  }
}
