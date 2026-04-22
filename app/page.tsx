import Sidebar from "./components/Sidebar";

import ArticleCard from "./components/ArticleCard";
import { getArticles } from "./lib/articles";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="feed-container">
        <div className="article-list">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article as any} />
          ))}
        </div>
      </div>
    </div>
  );
}