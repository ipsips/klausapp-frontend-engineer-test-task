export interface NewUser {
  name: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "AGENT" | "ACCOUNT_MANAGER" | "EXTERNAL_REVIEWER";
}

export interface User extends NewUser {
  id: number;
}

export const userRoles = ["ADMIN", "AGENT", "ACCOUNT_MANAGER", "EXTERNAL_REVIEWER"];
export const defaultUserRole = "AGENT";

export const createBlankUser = (): Partial<NewUser> => ({ role: defaultUserRole });

const newUserKeys = ["name", "email", "avatar", "role"];

export const isNewUser = (value: any): value is NewUser => {
  return (
    value &&
    hasKeys(value, newUserKeys, true) &&
    isValidUserName(value.name) &&
    isValidUserEmail(value.email) &&
    isValidUserAvatar(value.avatar) &&
    isValidUserRole(value.role)
  );
};

export const isUserUpdateObject = (value: any): value is Partial<NewUser> => {
  return (
    value &&
    hasKeys(value, newUserKeys) &&
    (typeof value.name === "undefined" || isValidUserName(value.name)) &&
    (typeof value.email === "undefined" || isValidUserEmail(value.email)) &&
    (typeof value.avatar === "undefined" || isValidUserAvatar(value.avatar)) &&
    (typeof value.role === "undefined" || isValidUserRole(value.role))
  );
};

const isValidUserName = (value: any) =>
  typeof value === "string" && value.length > 0;

const isValidUserEmail = (value: any) =>
  typeof value === "string" && value.length > 0;

const isValidUserAvatar = (value: any) =>
  typeof value === "string" && value.length > 0;

const isValidUserRole = (value: any) =>
  typeof value === "string" && userRoles.includes(value);

const hasKeys = (
  object: Record<string, any>,
  keys: string[],
  exact = false
): boolean => {
  const objectKeys = Object.keys(object);

  if (exact && keys.length !== objectKeys.length) {
    return false;
  }

  if (!exact && keys.length < objectKeys.length) {
    return false;
  }

  return objectKeys.every((key) => keys.includes(key));
};
