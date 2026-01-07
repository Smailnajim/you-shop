import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * AllExceptionsFilter - Global exception filter for handling all exceptions
 *
 * This filter catches all exceptions including:
 * - HttpExceptions
 * - RPC errors from microservices
 * - General errors
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Handle HttpException
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message =
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : (exceptionResponse as any).message || exception.message;
        }
        // Handle RPC errors from microservices
        else if (exception?.error) {
            // RPC exception format: { success: false, error: { message, statusCode } }
            const rpcError = exception.error;
            status = rpcError?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
            message = rpcError?.message || 'Microservice error';
        }
        // Handle general errors
        else if (exception?.message) {
            message = exception.message;
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
}
