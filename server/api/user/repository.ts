import { isNewUser, NewUser, User } from "model/User.ts";
import dirname from "dirname";

const { __dirname } = dirname(import.meta);

export const readUser = (id: number): User | undefined => {
  const users = readUsers();
  return users.find((user) => user.id === id);
};

export const readUsers = (): User[] => {
  const users = JSON.parse(localStorage.getItem("users"));

  if (!Array.isArray(users)) {
    throw new Error(
      'No users found in storage. Make a POST request to /api/users with "populate" as body to populate storage. Example: curl -X POST -d \'"populate"\' http://localhost:8000/api/user'
    );
  }

  return users;
};

export const writeUser = (user: User | NewUser): void => {
  const users = readUsers();

  if (isNewUser(user)) {
    replaceUsers({ id: getAutoIncrement(users), ...user }, ...users);
    return;
  }

  const index = users.findIndex(({ id }) => id === user.id);

  if (index > -1) {
    const nextUsers = users.slice();
    nextUsers.splice(index, 1, user);
    replaceUsers(...nextUsers);
  }
};

export const updateUser = (id: number, userUpdateObject: Partial<NewUser>) => {
  const user = readUser(id);

  if (!user) {
    throw new Error(`User with id ${id} does not exist`);
  }

  writeUser({ ...user, ...userUpdateObject });
};

export const deleteUser = (id: number): void => {
  const users = readUsers();
  const index = users.findIndex((user) => id === user.id);

  console.log({ id, index });

  if (index === -1) {
    throw new Error(`User with id ${id} does not exist`);
  }

  const newUsers = users.slice();
  newUsers.splice(index, 1);

  replaceUsers(...newUsers);
};

/**
 * Because this is a serverless app we need a way to seed local storage with initial data
 */
export const populateStorage = async () => {
  const decoder = new TextDecoder("utf-8");
  const rawData = await Deno.readFile(`${__dirname}/resources/users.json`);
  const { users } = JSON.parse(decoder.decode(rawData));
  replaceUsers(...users);
};

const getAutoIncrement = (users: User[]): number =>
  Math.max(0, ...users.map((user) => user.id)) + 1;

const replaceUsers = (...users: User[]): void => {
  users = users.map((user) => Object.assign(Object.create(null), user));
  localStorage.setItem("users", JSON.stringify(users));
};
