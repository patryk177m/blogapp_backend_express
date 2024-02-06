import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRouter } from './user/user.router';
import { postRouter } from './post/post.router';
import { categoryRouter } from './category/category.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);

app.listen(PORT, () => {
  console.log(`Success is running http://locahost:${PORT}`)
})

