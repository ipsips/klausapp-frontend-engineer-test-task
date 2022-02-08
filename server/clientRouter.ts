import { Router } from "oak";
import { readableStreamFromReader } from "streams";
import { resolve } from "path";
import { exists } from "fs";
import dirname from "dirname";
import { readUsers } from "./api/user/repository.ts";
import { renderToString } from "./ssr.tsx";
import { User } from "model/User.ts";

const { __dirname } = dirname(import.meta);

export const clientRouter = new Router()
  .get("/", (context) => {
    let users: User[] = [];
    try {
      users = readUsers();
    } catch (error) {}
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
