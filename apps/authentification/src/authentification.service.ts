import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './authentification.repository';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthentificationService {
  constructor(private readonly authRepository: AuthRepository) { }
  getHello(): string {
    return 'Hello World!';
  }

  async register(registerData: RegisterDto) {
    console.log('registerData\n', registerData);
    //check if email already exists
    const user = await this.authRepository.findUserByEmail(registerData.email);
    if (user) return new Error('User already exists');
    //find or create default role
    console.log('-------------**\n');
    const role = await this.authRepository.findOrCreateDefaultRole();
    //hash password
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    console.log('-------------**\n');
    //create user
    return await this.authRepository.createUser({
      ...registerData,
      password: hashedPassword,
      role: {
        connect: { id: role.id },
      },
    });
  }

  async login(loginData: LoginDto) {
    console.log(loginData);
    const user = await this.authRepository.findUserByEmail(loginData.email);
    if (!user) throw new Error('User not found');
    if (user.password !== loginData.password) throw new Error('Invalid password');
    return user;
  }
}
