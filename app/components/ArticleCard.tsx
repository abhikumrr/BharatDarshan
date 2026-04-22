import type { Article } from "@/app/generated/prisma/client";
import Link from "next/link";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article className="article-card">
        <div className="article-card-content">
          <div className="article-meta">
            <div className="author-info">
              <div className="author-avatar">
                {article.author[0]}
              </div>
              <span className="author-name">{article.author}</span>
            </div>
          </div>

          <h2 className="article-title">{article.title}</h2>
          <p className="article-summary">{article.summary}</p>

          <div className="article-footer">
            <span className="article-date">{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="article-dot">·</span>
            <span className="article-read-time">{article.readTime}</span>
            <span className="article-category-tag">{article.category}</span>
          </div>
        </div>

        <div className="article-card-thumbnail">
          <div className="thumbnail-placeholder">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
