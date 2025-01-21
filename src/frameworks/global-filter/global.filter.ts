// import { getInnerReason } from '@core/shared/get-inner-exception';
import { Catch, Logger } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Request, Response } from 'express';
const getInnerReason = (exception: any) => {
  const reason = exception?.reason;
  if (!reason) return exception;
  return getInnerReason(reason);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const reason = getInnerReason(exception);
    const code = reason?.code ?? reason?.response?.code;
    const errors = reason?.response?.error;
    this.logger.error({ exception: reason }, '', 'GlobalExceptionFilter');
    const status = reason?.status ?? reason?.response?.statusCode ?? 500;
    const errorResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception?.message };
    let message = reason?.message ?? reason?.response?.message;
    this.logger.error(
      {
        status,
        message,
        value: {
          path: `${request.method} ${request.url}`,
          ...(errorResponse?.metadata || errorResponse?.value),
        },
      },
      exception?.stack,
    );
    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //   message = `We've experienced a problem. Please try again or contact customer support.`;
    // }
    response.status(status).json({
      status,
      message,
      code,
      errors,
      path: `${request.method} ${request.url}`,
    });
  }
}
