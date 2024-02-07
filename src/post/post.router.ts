import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as PostService from './post.service';

export const postRouter = express.Router();

// postRouter.get('/', async (request: Request, response: Response) => {
//   try {
//     const posts = await PostService.getPosts();
//     return response.status(200).json(posts);
//   } catch (err: any) {
//     return response.status(500).json(err.message);
//   }
// })

postRouter.get('/', async (request: Request, response: Response) => {
  const title = String(request.query.title);
  try {
    let posts; 
    if (title === 'undefined') {
      posts = await PostService.getPosts();
    } else {
      posts = await PostService.getPostsByTitle(title);
    }
    
    if (!posts) response.status(404).json("Posts not be found!");
    return response.status(200).json(posts);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})

postRouter.post('/', body(), async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(400).json({ errors: errors.array() });

  try {
    const { title, content, likes, dislikes, image, userId } = request.body;
    const date = await new Date();
    const newPost = await PostService.createPost({
      title,
      content,
      likes,
      dislikes,
      date,
      image,
      userId,
    });
    return response.status(201).json(newPost);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})
