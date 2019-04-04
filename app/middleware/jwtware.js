'use strict';
module.exports = app => {
  return async function(ctx, next) {
    const { req } = ctx;
    const authorization = req.headers.authorization;
    if (authorization) {
      try {
        const decoded = app.jwt.decode(
          authorization.split(' ')[1],
          app.jwt.secret
        );
        req.user = decoded.user;
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          code: 1,
          error: '不被允许的资源！',
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 1,
        error: '不被允许的资源',
      };
    }
  };
};
