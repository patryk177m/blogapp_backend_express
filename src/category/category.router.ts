import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as CategoryService from './category.service';

export const categoryRouter = express.Router();

categoryRouter.get('/', async (request: Request, response: Response) => {
  try {
    const categories = await CategoryService.getCategories();
    return response.status(200).json(categories);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})