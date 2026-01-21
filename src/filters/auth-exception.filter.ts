import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check if the request expects HTML (browser navigation or form submission)
    const accept = request.headers.accept;
    const isHtml = accept && accept.includes('text/html');

    if (isHtml) {
      // Redirect to login page
      return response.redirect('/auth/login');
    }

    // For API/AJAX requests, return standard 401
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
