import { Category, Post, User, Comment, PostCategory } from "../src/data/types";
import { db } from "../src/utils/db.server";

function getUsers(): (Omit<User, 'id'>)[] {
  return [
    {
      name: "John",
      surname: "Doe",
      title: "title JohnDoe",
      about: "somthing ... John Doe",
    },
    {
      name: "Jan",
      surname: "Kowalski",
      title: "title JanKowalski",
      about: "somthing ...Jan Kowalski",
    },
    {
      name: "Anna",
      surname: "Nowak",
      title: "title AnnaNowak",
      about: "somthing ... Anna Nowak",
    },
  ];
}

function getPosts(): (Omit<Post, "id">)[] {
  return [
    {
      title: "title post 1 John Doe",
      content: "content post 1 John Doe",
      likes: 0,
      dislikes: 0,
      date: new Date(),
      image: 'image post 1',
      userId: 1,
    },
    {
      title: "title post 2 John Doe",
      content: "content post 2 John Doe",
      likes: 5,
      dislikes: 0,
      date: new Date(),
      image: 'image post 2',
      userId: 1,
    },
    {
      title: "title post Jan Kowalski",
      content: "content post Jan Kowalski",
      likes: 0,
      dislikes: 2,
      date: new Date(),
      image: 'image post 3',
      userId: 2,
    },
  ];
}

function getComments(): (Omit<Comment, 'id'>)[] {
  return [
    {
      content: "content 1 post 1",
      authorId: 1,
      postId: 1,
    },
    {
      content: "content 2 post 2",
      authorId: 2,
      postId: 2,
    },
    {
      content: "content 3 post 1",
      authorId: 1,
      postId: 1,
    },
  ];
}

function getCategories(): (Omit<Category, 'id'>)[] {
  return [
    {
      title: "JavaScript",
      about: "beautyfull language javascript",
      image: "image javascript",
    },
    {
      title: "Java",
      about: "beautyfull language java",
      image: "image java",
    },
    {
      title: "Node.js",
      about: "beautyfull language ndoe.js",
      image: "image javascript node.js",
    },
  ];
}

function getPostsCategories(): (Omit<PostCategory, 'id'>)[] {
  return [
    {
      postId: 1,
      categoryId: 1,
    },
    {
      postId: 2,
      categoryId: 2,
    },
    {
      postId: 3,
      categoryId: 3,
    },
    {
      postId: 1,
      categoryId: 2,
    },
  ];
}

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          name: user.name,
          surname: user.surname,
          title: user.title,
          about: user.about,
        },
      });
    })
  );
  await Promise.all(
    getPosts().map((post) => {
      return db.post.create({
        data: {
          title: post.title,
          content: post.content,
          likes: post.likes,
          dislikes: post.dislikes,
          date: post.date,
          image: post.image || null,
          userId: post.userId,
        },
      });
    })
  );
  await Promise.all(
    getComments().map((comment) => {
      return db.comment.create({
        data: {
          content: comment.content,
          authorId: comment.authorId,
          postId: comment.postId,
        },
      });
    })
  );
  await Promise.all(
    getCategories().map(category => {
      return db.category.create({
        data: {
          title: category.title,
          about: category.about,
          image: category.image || null,
        }
      })
    })
  )
  await Promise.all(
    getPostsCategories().map(postCategory => {
      return db.postCategory.create({
        data: {
          postId: postCategory.postId,
          categoryId: postCategory.categoryId,
        }
      })
    })
  )
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
