import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ReasonFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

 

    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Internal server error";
    if (typeof message == 'object') {
      message = message.error ? message.error : message.message || message;
    }

    response.status(status).json({
      meta: {
        code: status,
        message,
      },
      data: new Object(),
    });
  }
}
