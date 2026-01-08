import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * CurrentUser Decorator - Extract user data from the Request
 * 
 * usage:
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserPayload) {
 *   return user;
 * }
 * 
 * // or to get a specific field
 * @Get('profile')
 * getProfile(@CurrentUser('email') email: string) {
 *   return email;
 * }
 */
export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // if a specific field is provided, return it only
        if (data) {
            return user?.[data];
        }
        return user;
    },
);

// type of user data extracted from the token
export interface UserPayload {
    userId: string;
    email: string;
    role: string;
}
