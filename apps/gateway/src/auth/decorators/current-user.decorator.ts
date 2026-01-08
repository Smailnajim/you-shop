import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * CurrentUser Decorator - لاستخراج بيانات المستخدم من الـ Request
 * 
 * الاستخدام:
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserPayload) {
 *   return user;
 * }
 * 
 * // أو للحصول على حقل معين
 * @Get('profile')
 * getProfile(@CurrentUser('email') email: string) {
 *   return email;
 * }
 */
export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // إذا تم تحديد حقل معين، نرجعه فقط
        if (data) {
            return user?.[data];
        }

        return user;
    },
);

// نوع بيانات المستخدم المُستخرجة من التوكن
export interface UserPayload {
    userId: string;
    email: string;
    role: string;
}
