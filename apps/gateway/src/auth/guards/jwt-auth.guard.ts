import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * JwtAuthGuard - Routes that require authentication
 * usage:
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserPayload) {
 *   return user;
 * }
 */
/**
 * usage:
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@Request() req) {
 *   return req.user;
 * }
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // call the parent canActivate method
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // handle authentication errors
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Access denied - Invalid or missing token')
      );
    }
    return user;
  }
}
