import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // If no roles are required, allow access
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Check if user exists and has a role
        if (!user || !user.role) {
            throw new ForbiddenException('Access denied - No role assigned');
        }

        // Check if user's role matches any of the required roles
        const hasRole = requiredRoles.some((role) =>
            user.role.toLowerCase() === role.toLowerCase()
        );

        if (!hasRole) {
            throw new ForbiddenException(
                `Access denied - Requires one of these roles: ${requiredRoles.join(', ')}`
            );
        }

        return true;
    }
}
