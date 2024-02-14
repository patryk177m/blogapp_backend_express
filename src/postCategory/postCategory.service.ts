import { db } from "../utils/db.server";
import { Category, Post, PostCategory } from "../data/types";

export const getPostsByCategory = async (
  categoryTitle: string
): Promise<Post[] | null> => {
  return db.post.findMany({
    where: {
      categories: {
        some: {
          category: {
            title: {
              equals: categoryTitle,
              mode: "insensitive",
            },
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      likes: true,
      dislikes: true,
      date: true,
      image: true,
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          title: true,
          about: true,
        },
      },
    },
  });
};
