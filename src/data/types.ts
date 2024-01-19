export type User = {
  id: number;
  name: string;
  surname: string;
  title: string;
  about: string | null;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  date: Date;
  image: string | null;
  userId: number;
};

export type Comment = {
  id: number;
  content: string;
  authorId: number;
  postId: number;
};

export type Category = {
  id: number;
  title: string;
  about: string;
  image: string | null;
};

export type PostCategory = {
  id: number;
  postId: number;
  categoryId: number;
};