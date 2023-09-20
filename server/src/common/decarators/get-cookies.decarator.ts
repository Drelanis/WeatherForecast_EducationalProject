import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Cookie = createParamDecorator(
  async (key: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = await ctx.getContext().req;
    return key ? request.cookies[key] : request.cookies;
  },
);
