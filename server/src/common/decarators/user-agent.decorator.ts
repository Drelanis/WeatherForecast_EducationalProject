import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserAgent = createParamDecorator(
  async (key: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const userAgent =
      await ctx.getContext().req.headers[process.env.USER_AGENT];
    return userAgent;
  },
);
