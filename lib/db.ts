import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
}

export const db = globalForPrisma.prisma;

