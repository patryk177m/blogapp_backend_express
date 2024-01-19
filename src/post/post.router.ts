import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as PostService from './post.service';

export const postRouter = express.Router();

postRouter.get('/', async (request: Request, response: Response) => {
  try {
    const posts = await PostService.getPosts();
    return response.status(200).json(posts);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})