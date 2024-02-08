import { Post, PostWrite } from "../data/types";
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

export const getPostsSearch = async (
  query: string
): Promise<Post[] | null> => {
  return await db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query || "",
            mode: "insensitive",
          },
        },
        {
          user: {
            surname: {
              contains: query || "",
              mode: "insensitive",
            },
          },
        },
      ],
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

export const getPostsByNameUser = async (
  query: string
): Promise<Post[] | null> => {
  return await db.post.findMany({
    where: {
      user: {
        name: {
          contains: query || "",
          mode: "insensitive",
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

export const getPost = async (id: number): Promise<Post | null> => {
  return await db.post.findUnique({
    where: {
      id,
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

export const createPost = async (post: PostWrite): Promise<Post> => {
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

export const updatePost = async (
  id: number,
  post: PostWrite
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

export const deletePost = async (id: number): Promise<void> => {
  await db.post.delete({
    where: {
      id,
    },
  });
};
