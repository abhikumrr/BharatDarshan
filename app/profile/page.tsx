"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import ArticleCard from "@/app/components/ArticleCard";
import { getUserArticles } from "@/app/actions/article";
import { Prisma } from "@prisma/client";

type Article = Prisma.ArticleGetPayload<{}>;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setIsLoadingArticles(true);
      getUserArticles()
        .then((data) => setArticles(data))
        .catch(console.error)
        .finally(() => setIsLoadingArticles(false));
    }
  }, [session]);

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="feed-container">
        {status === "loading" ? (
          <div className="profile-loading">
            <div className="loading-spinner" />
          </div>
        ) : session ? (
          <div className="profile-page">
            <div className="profile-card">
              <div className="profile-avatar-large">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <div className="avatar-placeholder large">
                    {session.user?.name?.[0] || "U"}
                  </div>
                )}
              </div>
              <h1 className="profile-name">{session.user?.name}</h1>
              <p className="profile-email">{session.user?.email}</p>
              <button
                className="sign-out-btn"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <span className="stat-number">{articles.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">0</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">0</span>
                <span className="stat-label">Following</span>
              </div>
            </div>

            <div className="profile-articles" style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>Your Articles</h2>
              {isLoadingArticles ? (
                <p style={{ color: "#666" }}>Loading your articles...</p>
              ) : articles.length > 0 ? (
                <div className="article-list">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article as any} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666" }}>You haven't written any articles yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-page">
            <div className="auth-card">
              <svg
                className="auth-logo"
                width="40"
                height="40"
                viewBox="0 0 1043.63 592.71"
              >
                <g>
                  <path
                    d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36"
                    fill="currentColor"
                  />
                  <path
                    d="M911.56 296.36c0 154.06-65.89 278.88-147.17 278.88s-147.17-124.82-147.17-278.88S683.11 17.48 764.39 17.48s147.17 124.82 147.17 278.88"
                    fill="currentColor"
                  />
                  <path
                    d="M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"
                    fill="currentColor"
                  />
                </g>
              </svg>
              <h1>Welcome back.</h1>
              <p className="auth-subtitle">
                Sign in to access your personalized feed, write stories, and
                connect with readers.
              </p>

              <button
                className="google-sign-in-btn"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>

              <p className="auth-terms">
                Click "Sign in" to agree to Medium&apos;s Terms of Service and
                acknowledge that Medium&apos;s Privacy Policy applies to you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
