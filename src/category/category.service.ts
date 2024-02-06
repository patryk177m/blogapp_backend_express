import { Category } from "../data/types";
import { db } from "../utils/db.server";

export const getCategories = async (): Promise<Category[]> => {
  return await db.category.findMany({
    take: 4,
    select: {
      id: true,
      title: true,
      about: true,
      image: true,
    },
    // orderBy: {
    //   title: 'asc',
    // }
  })
}