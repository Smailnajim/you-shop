import { Injectable, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './authentification.repository';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthentificationService {
  constructor(private readonly authRepository: AuthRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async register(registerData: RegisterDto) {
    console.log('registerData\n', registerData);
    //check if email already exists
    const user = await this.authRepository.findUserByEmail(registerData.email);
    if (user) {
      throw new RpcException({
        message: 'User already exists',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    //find or create default role
    console.log('-------------**\n');
    const role = await this.authRepository.findOrCreateDefaultRole();
    console.log('-------------**\n');
    if (!role)
      throw new RpcException({
        message: 'role not exist',
        statusCode: HttpStatus.NOT_FOUND,
      });
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
    if (!user) {
      throw new RpcException({
        message: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new RpcException({
        message: 'Invalid password',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return user;
  }
}
