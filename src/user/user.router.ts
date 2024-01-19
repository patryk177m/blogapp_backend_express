import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserService from "./user.service";

export const userRouter = express.Router();

userRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users = await UserService.getUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

userRouter.get(`/:id`, async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);
  try {
    const user = await UserService.getUser(id);
    if (!user) response.status(404).json("User not be found!");
    return response.status(200).json(user);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});

userRouter.post("/", body(), async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(400).json({ errors: errors.array() });

  try {
    const { name, surname, title, about } = request.body;
    const newUser = await UserService.createUser({
      name,
      surname,
      title,
      about,
    });
    return response.status(201).json(newUser);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});

userRouter.put("/:id", body(), async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(400).json({ errors: errors.array() });

  const id: number = Number(request.params.id);

  try {
    const { name, surname, title, about } = request.body;
    const updatedUser = await UserService.updateUser(
      { name, surname, title, about },
      id
    );
    return response.status(200).json(updatedUser);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});

userRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);
  try {
    await UserService.deleteUser(id);
    return response.status(204).json("User has been succesfully deleted");
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});
