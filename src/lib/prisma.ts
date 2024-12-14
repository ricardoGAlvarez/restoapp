import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Agregar la declaración global en el entorno de Node
declare global {
  // Esto ayuda a evitar múltiples instancias del cliente Prisma en el modo de desarrollo
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
