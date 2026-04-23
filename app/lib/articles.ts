import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getArticles(category?: string) {
  if (category) {
    return await prisma.article.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
