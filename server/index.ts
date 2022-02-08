import { Application, isHttpError, Router, Status } from "https://deno.land/x/oak@v10.2.0/mod.ts";
import { apiRouter } from "./api/apiRouter.ts";
import { clientRouter } from "./clientRouter.ts";
import "https://deno.land/x/xhr@0.1.2/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
import { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

installGlobals();

export const startServer = () =>
  new Application()
    .use(virtualStorage())
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
