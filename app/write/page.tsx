"use client";

import { useState } from "react";
import { createArticle } from "../actions/article";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function WriteArticlePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div className="page-layout">
        <div className="feed-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-layout">
        <div className="feed-container">
          <h2>Please sign in to write an article.</h2>
        </div>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    try {
      const result = await createArticle(formData);
      if (result.success) {
        router.push("/");
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-layout">
      <div className="feed-container" style={{ maxWidth: "800px", width: "100%", margin: "0 auto", padding: "2rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", fontWeight: "bold" }}>Write a New Article</h1>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="title" style={{ fontWeight: "600" }}>Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="Enter an engaging title..."
              required 
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }} 
            />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="summary" style={{ fontWeight: "600" }}>Summary</label>
            <textarea 
              id="summary" 
              name="summary" 
              placeholder="A brief summary of your article..."
              required 
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", minHeight: "80px", resize: "vertical" }} 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="category" style={{ fontWeight: "600" }}>Category</label>
            <select 
              id="category" 
              name="category" 
              required 
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", backgroundColor: "white" }}
            >
              <option value="Philosophy">Philosophy</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Music & Instruments">Music & Instruments</option>
              <option value="Wildlife & Nature">Wildlife & Nature</option>
              <option value="Sports & Martial Arts">Sports & Martial Arts</option>
              <option value="Science & Inventions">Science & Inventions</option>
              <option value="Literature & Poetry">Literature & Poetry</option>
            </select>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="coverImage" style={{ fontWeight: "600" }}>Cover Image URL (optional)</label>
            <input 
              type="url" 
              id="coverImage" 
              name="coverImage" 
              placeholder="https://example.com/image.jpg"
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }} 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="content" style={{ fontWeight: "600" }}>Content</label>
            <textarea 
              id="content" 
              name="content" 
              placeholder="Write your amazing article here..."
              required 
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", minHeight: "300px", resize: "vertical" }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={{ 
              padding: "1rem", 
              background: isSubmitting ? "#666" : "#000", 
              color: "#fff", 
              border: "none", 
              borderRadius: "8px", 
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
