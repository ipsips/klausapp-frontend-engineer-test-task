import { NewUser, User } from "../../../model/User.ts";
import {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "../firebase.ts";

export const readUsers = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => doc.data());
};

export const createUser = async (user: NewUser): Promise<void> => {
  const users = await readUsers();
  const id = getAutoIncrement(users);
  await setDoc(doc(db, "users", id.toString()), { id, ...user });
};

export const updateUser = async (
  id: number,
  userUpdateObject: Partial<NewUser>
): Promise<void> => {
  await updateDoc(doc(db, "users", id.toString()), userUpdateObject);
};

export const deleteUser = async (id: number): Promise<void> => {
  await deleteDoc(doc(db, "users", id.toString()));
};

const getAutoIncrement = (users: User[]): number =>
  Math.max(0, ...users.map((user) => user.id)) + 1;
