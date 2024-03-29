import { SetMetadata, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Public = () => SetMetadata(process.env.PUBLIC_KEY, true);

export const isPublic = (ctx: ExecutionContext, reflector: Reflector) => {
  const isPublic = reflector.getAllAndOverride<boolean>(
    process.env.PUBLIC_KEY,
    [ctx.getHandler(), ctx.getClass()],
  );
  return isPublic;
};
