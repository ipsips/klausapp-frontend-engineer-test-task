import { Application, isHttpError, Router, Status } from "https://deno.land/x/oak@v10.2.0/mod.ts";
import { apiRouter } from "./api/apiRouter.ts";
import { clientRouter } from "./clientRouter.ts";

export const startServer = () =>
  new Application()
    .use(new Router().use("/api", apiRouter.routes()).routes())
    .use(clientRouter.routes())
    .use(async (context, next) => {
      try {
        await next();
      } catch (error) {
        if (!isHttpError(error)) {
          context.response.body = error.message;
          context.response.status = Status.InternalServerError;
        }
      }
    })
    .listen({ port: 8000 });
