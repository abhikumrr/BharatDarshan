"use client";

import { useState } from "react";

const tabs = ["For you", "Following"];

export default function FeedTabs() {
  const [activeTab, setActiveTab] = useState("For you");

  return (
    <div className="feed-tabs">
      <button className="feed-tab add-tab" title="Discover more topics">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`feed-tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
