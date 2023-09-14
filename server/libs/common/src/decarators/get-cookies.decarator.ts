import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return key ? request.cookies[key] : request.cookies;
  },
);
