import { Category } from "../data/types";
import { db } from "../utils/db.server";

export const getCategories = async (): Promise<Category[]> => {
  return await db.category.findMany({
    // take: 4,
    select: {
      id: true,
      title: true,
      about: true,
      image: true,
    },
    // orderBy: {
    //   title: 'asc',
    // }
  });
};

export const getCategory = async (id: number): Promise<Category | null> => {
  return await db.category.findUnique({
    where: {
      id,
    },
  });
};

export const createCategories = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const { title, about, image } = category;
  return await db.category.create({
    data: {
      title,
      about,
      image,
    },
  });
};

export const updateCategory = async (
  category: Omit<Category, "id">,
  id: number
): Promise<Category> => {
  const { title, about, image } = category;
  return await db.category.update({
    where: {
      id,
    },
    data: {
      title,
      about,
      image,
    },
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  await db.category.delete({
    where: {
      id,
    },
  });
}
