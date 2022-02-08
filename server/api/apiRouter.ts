import { Router, Status } from "https://deno.land/x/oak@v10.2.0/mod.ts";
import { isNewUser, isUserUpdateObject } from "../../model/User.ts";
import {
  deleteUser,
  populateStorage,
  readUsers,
  updateUser,
  writeUser,
} from "./user/repository.ts";

export const apiRouter = new Router()
  .get("/user", (context) => {
    try {
      const users = readUsers();
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

    /**
     * Because this is a serverless app we need a way to seed local storage with initial data
     */
    if (user === "populate") {
      await populateStorage();
      context.response.status = Status.OK;
      return;
    }

    if (!isNewUser(user)) {
      context.response.status = Status.BadRequest;
      return;
    }

    writeUser(user);

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
      updateUser(id, userUpdateObject);
      context.response.status = Status.OK;
    } catch (error) {
      context.response.body = error.message;
      context.response.status = Status.NotFound;
    }
  })
  .delete("/user/:id([1-9]\\d*)", (context) => {
    const id = Number(context.params.id);

    try {
      deleteUser(id);
      context.response.status = Status.OK;
    } catch (error) {
      context.response.body = error.message;
      context.response.status = Status.NotFound;
    }
  });
