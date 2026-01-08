import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generate access and refresh tokens for a user
   */
  async generateTokens(user: {
    id: number;
    email: string;
    role?: string;
  }): Promise<TokensResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name || 'client',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Generate access token (short-lived) - 15 minutes
   */
  private async generateAccessToken(payload: JwtPayload): Promise<string> {
    console.log('generateAccessToken\n:', process.env.JWT_ACCESS_SECRET);
    return this.jwtService.signAsync(
      { ...payload },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: 15 * 60, // 15 minutes in seconds
      },
    );
  }

  /**
   * Generate refresh token (long-lived) - 7 days
   */
  private async generateRefreshToken(payload: JwtPayload): Promise<string> {
    console.log('generateRefreshToken\n:', process.env.JWT_REFRESH_SECRET);
    return this.jwtService.signAsync(
      { ...payload },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
      },
    );
  }

  /**
   * Verify access token
   */
  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  /**
   * Verify refresh token
   */
  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
