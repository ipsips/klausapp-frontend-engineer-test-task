import { Router } from "https://deno.land/x/oak@v10.2.0/mod.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.125.0/streams/mod.ts";
import { resolve } from "https://deno.land/std@0.125.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.125.0/fs/mod.ts";
import dirname from "https://deno.land/x/dirname@1.1.2/mod.ts";
import { readUsers } from "./api/user/repository.ts";
import { renderToString } from "./ssr.tsx";
import { User } from "../model/User.ts";

const { __dirname } = dirname(import.meta);

export const clientRouter = new Router()
  .get("/", async (context) => {
    const users: User[] = [] // await readUsers();
    context.response.body = renderToString(users);
  })
  .get("/static/(.+)", async (context) => {
    const filePath = resolve(
      __dirname,
      `../client/dist/${context.params[0]}`
    );
    const fileExists = await exists(filePath);

    if (fileExists) {
      context.response.body = readableStreamFromReader(
        await Deno.open(filePath, { read: true })
      );
    }
  });
