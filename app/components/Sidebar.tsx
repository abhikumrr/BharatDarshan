"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const categories = [
  { name: "Philosophy", slug: "philosophy" },
  { name: "History", slug: "history" },
  { name: "Geography", slug: "geography" },
  { name: "Music & Instruments", slug: "music-instruments" },
  { name: "Wildlife & Nature", slug: "wildlife-nature" },
  { name: "Sports & Martial Arts", slug: "sports-martial-arts" },
  { name: "Science & Inventions", slug: "science-inventions" },
  { name: "Literature & Poetry", slug: "literature-poetry" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(true);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link
          href="/"
          className={`sidebar-link ${pathname === "/" ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </Link>

        <div className="sidebar-section">
          <button
            className="sidebar-link sidebar-toggle"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <span>Categories</span>
            <svg
              className={`chevron ${categoryOpen ? "open" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {categoryOpen && (
            <div className="sidebar-submenu">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`sidebar-sublink ${
                    pathname === `/category/${cat.slug}` ? "active" : ""
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/profile"
          className={`sidebar-link ${pathname === "/profile" ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-topics">
          <h4>Recommended Topics</h4>
          <div className="topic-chips">
            {["Philosophy", "Music & Instruments", "Science & Inventions", "Literature & Poetry", "Wildlife & Nature"].map(
              (topic) => (
                <span key={topic} className="topic-chip">
                  {topic}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
