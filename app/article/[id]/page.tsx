import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>{article.title}</h1>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", color: "#666" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
          {article.author[0]}
        </div>
        <div>
          <div style={{ fontWeight: "600", color: "#000" }}>{article.author}</div>
          <div>{new Date(article.createdAt).toLocaleDateString()} · {article.readTime} · {article.category}</div>
        </div>
      </div>

      {article.coverImage && (
        <img 
          src={article.coverImage} 
          alt={article.title} 
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "2rem" }} 
        />
      )}

      <div style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "#222" }}>
        {article.content.split('\n').map((paragraph: string, idx: number) => (
          <p key={idx} style={{ marginBottom: "1.5rem" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
