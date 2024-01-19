import { User } from "../data/types";
import { db } from "../utils/db.server";

export const getUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      title: true,
      about: true,
    },
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { name, surname, title, about } = user;
  return await db.user.create({
    data: {
      name,
      surname,
      title,
      about,
    },
  });
};

export const updateUser = async (
  user: Omit<User, "id">,
  id: number
): Promise<User> => {
  const { name, surname, title, about } = user;

  return await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      surname,
      title,
      about,
    },
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  await db.user.delete({
    where: {
      id,
    },
  });
}
