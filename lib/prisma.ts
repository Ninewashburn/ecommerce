import { PrismaClient } from "@prisma/client";

// Déclaration pour éviter les erreurs TypeScript avec globalThis
declare global {
  var prisma: PrismaClient | undefined;
}

// Éviter de créer plusieurs instances de PrismaClient en développement
// à cause du rechargement à chaud (hot reloading)
export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
