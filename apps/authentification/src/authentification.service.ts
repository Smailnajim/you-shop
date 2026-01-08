import { Injectable, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './authentification.repository';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './services';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './interfaces/LoginResponse';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

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
        statusCode: HttpStatus.CONFLICT,
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
    const newUser = await this.authRepository.createUser({
      ...registerData,
      password: hashedPassword,
      role: {
        connect: { id: role.id },
      },
    });

    // Generate tokens for new user
    const tokens = await this.tokenService.generateTokens({
      id: newUser.id,
      email: newUser.email,
      role: role.name,
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      ...tokens,
    };
  }

  async login(loginData: LoginDto): Promise<LoginResponse> {
    console.log(loginData);
    const user = await this.authRepository.findUserByEmail(loginData.email);
    if (!user) {
      throw new RpcException({
        message: 'Email not exist or password is not correct',
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

    // Generate tokens
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    console.log(user.role.name);
    // Return user data without password + tokens
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
      ...tokens,
    };
  }
}
