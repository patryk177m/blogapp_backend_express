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

categoryRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);

  try {
    const category = await CategoryService.getCategory(id);
    if (!category) response.status(404).json("User not be found!");
    return response.status(200).json(category);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})

categoryRouter.post('/', body(), async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(400).json({ errors: errors.array() });

  try {
    const { title, about, image } = request.body;
    const newCategory = await CategoryService.createCategories({
      title,
      about,
      image,
    });
    return response.status(201).json(newCategory);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})

categoryRouter.put("/:id", body(), async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(400).json({ errors: errors.array() });

  const id: number = Number(request.params.id);

  try {
    const { title, about, image } = request.body;
    const updatedCategory = await CategoryService.updateCategory(
      { title, about, image },
      id
    );
    return response.status(200).json(updatedCategory);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})

categoryRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);
  try {
    await CategoryService.deleteCategory(id);
    return response.status(204).json("User has been succesfully deleted");
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
})