import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as PostCategoryService from "./postCategory.service";

export const postCategoryRouter = express.Router();

// postCategoryRouter.get("/", async (request: Request, response: Response) => {
//   try {
//     response.status(404).json("Post not be found!");
//   } catch (err: any) {
//     return response.status(500).json(err.message);
//   }
// });

postCategoryRouter.get("/:categoryTitle", async (request: Request, response: Response) => {
  const categoryTitle = request.params.categoryTitle;
  try { 
    const posts = await PostCategoryService.getPostsByCategory(categoryTitle);
    if (!posts) response.status(404).json("Post not be found!");
    return response.status(200).json(posts);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});
