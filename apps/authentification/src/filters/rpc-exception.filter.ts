import {
  Catch,
  RpcExceptionFilter as NestRpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

/**
 * RpcExceptionFilter - Exception filter for handling RPC exceptions in microservices
 *
 * This filter catches all RpcExceptions and formats them into a consistent
 * error response structure for microservice communication.
 */
@Catch(RpcException)
export class RpcExceptionFilter implements NestRpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error = exception.getError();

    console.log('error-----------------------------');
    // Build the error response object
    const errorResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      error:
        typeof error === 'string' ? { message: error, statusCode: 500 } : error,
    };

    return throwError(() => errorResponse);
  }
}
