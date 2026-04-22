import Sidebar from "@/app/components/Sidebar";
import ArticleCard from "@/app/components/ArticleCard";
import { getArticles } from "@/app/lib/articles";

const categoryNames: Record<string, string> = {
  philosophy: "Philosophy",
  history: "History",
  geography: "Geography",
};

export function generateStaticParams() {
  return [
    { slug: "philosophy" },
    { slug: "history" },
    { slug: "geography" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = categoryNames[slug] || slug;
  const articles = await getArticles(slug);

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="feed-container">
        <div className="category-header">
          <h1>{categoryName}</h1>
          <p>{articles.length} articles</p>
        </div>
        <div className="article-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="empty-state">
              <p>No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
