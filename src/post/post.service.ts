import { Post } from "../data/types";
import { db } from "../utils/db.server";

export const getPosts = async (): Promise<Post[]> => {
  return await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      likes: true,
      dislikes: true,
      date: true,
      image: true,
      userId: true,
    },
  });
};

export const getPost = async (id: number): Promise<Post | null> => {
  return await db.post.findUnique({
    where: {
      id,
    },
  });
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { title, content, likes, dislikes, date, image, userId } = post;

  return await db.post.create({
    data: {
      title,
      content,
      likes,
      dislikes,
      date,
      image,
      userId,
    },
  });
};

export const updatePost = async (
  id: number,
  post: Omit<Post, "id">
): Promise<Post> => {
  const { title, content, likes, dislikes, date, image, userId } = post;

  return await db.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      likes,
      dislikes,
      date,
      image,
      userId,
    },
  });
};

export const deletePost =async (id: number): Promise<void> => {
  await db.post.delete({
    where: {
      id,
    }
  })
}