"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function createArticle(formData: FormData) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("You must be signed in to create an article.");
  }
  
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const coverImage = formData.get("coverImage") as string;
  
  if (!title || !summary || !content || !category) {
    throw new Error("Please fill in all required fields.");
  }
  
  // Basic read time calculation (200 words per min)
  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeMins} min read`;

  const newArticle = await prisma.article.create({
    data: {
      title,
      summary,
      content,
      category,
      coverImage: coverImage || null,
      author: session.user.name || "Anonymous",
      authorImage: session.user.image || null,
      readTime,
    },
  });

  revalidatePath("/");
  revalidatePath(`/category/${category.toLowerCase()}`);
  
  return { success: true, articleId: newArticle.id };
}

export async function getUserArticles() {
  const session = await auth();
  if (!session?.user?.name) {
    return [];
  }
  
  const articles = await prisma.article.findMany({
    where: { author: session.user.name },
    orderBy: { createdAt: "desc" }
  });
  
  return articles;
}
