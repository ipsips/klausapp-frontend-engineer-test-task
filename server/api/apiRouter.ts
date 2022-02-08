import { Router, Status } from "https://deno.land/x/oak@v10.2.0/mod.ts";
import { isNewUser, isUserUpdateObject } from "../../model/User.ts";
import {
  createUser,
  deleteUser,
  readUsers,
  updateUser,
} from "./user/repository.ts";
import { auth, signInWithEmailAndPassword } from "./firebase.ts";

export const apiRouter = new Router()
  .use(async (context, next) => {
    await signInWithEmailAndPassword(
      auth,
      Deno.env.get("FIREBASE_USERNAME"),
      Deno.env.get("FIREBASE_PASSWORD")
    );
    return next();
  })
  .get("/user", async (context) => {
    try {
      const users = await readUsers();
      context.response.type = "application/json";
      context.response.body = JSON.stringify(users);
      context.response.status = Status.OK;
    } catch (error) {
      context.response.body = error.message;
      context.response.status = Status.NotFound;
    }
  })
  .post("/user", async (context) => {
    const user = await context.request.body({ type: "json" }).value;

    if (!isNewUser(user)) {
      context.response.status = Status.BadRequest;
      return;
    }

    await createUser(user);

    context.response.status = Status.Created;
  })
  .put("/user/:id([1-9]\\d*)", async (context) => {
    const userUpdateObject = await context.request.body({ type: "json" }).value;
    const id = Number(context.params.id);

    if (!isUserUpdateObject(userUpdateObject)) {
      context.response.status = Status.BadRequest;
      return;
    }

    try {
      await updateUser(id, userUpdateObject);
      context.response.status = Status.OK;
    } catch (error) {
      context.response.body = error.message;
      context.response.status = Status.NotFound;
    }
  })
  .delete("/user/:id([1-9]\\d*)", async (context) => {
    const id = Number(context.params.id);

    try {
      await deleteUser(id);
      context.response.status = Status.OK;
    } catch (error) {
      context.response.body = error.message;
      context.response.status = Status.NotFound;
    }
  });
