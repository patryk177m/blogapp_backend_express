import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
}

declare global {
  var db: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.db ?? prismaClientSingleton();

export  { db };

if (process.env.NODE_ENV !== 'production') globalThis.db = db;




// -----------------------------------------------------------------------

// let db: PrismaClient;

// declare global {
//   var __db: PrismaClient | undefined;
// }

// if (!global.__db) {
//   global.__db = new PrismaClient();
// }

// db = global.__db;

// export { db }