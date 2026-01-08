import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
    sub: string; // user id
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            // extract token from header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // reject expired token
            ignoreExpiration: false,
            // secret key for verification
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    /**
     * This function is called after the token is verified
     * It returns the user data that will be available in request.user
     */
    async validate(payload: JwtPayload) {
        // You can add additional validation here (like database validation)
        if (!payload.sub || !payload.email) {
            throw new UnauthorizedException('Invalid token payload');
        }

        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
