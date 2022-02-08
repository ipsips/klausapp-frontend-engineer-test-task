import axios from "axios";
// @ts-ignore
import { NewUser, User } from "model/User.ts";

const API = axios.create({ baseURL: "/api" });

export const createUser = async (user: NewUser) =>
  API.post<void>("/user", user).then((response) => response.data);

export const readUsers = async () =>
  API.get<User[]>("/user").then((response) => response.data);

export const updateUser = async (id: number, user: Partial<NewUser>) =>
  API.put<void>(`/user/${id}`, user).then((response) => response.data);

export const deleteUser = async (id: number) =>
  API.delete<void>(`/user/${id}`).then((response) => response.data);
