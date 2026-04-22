"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link href="/" className="navbar-logo">
            <span>BharatDarshan</span>
          </Link>
        </div>

        <div className="navbar-center">
          <div className="search-bar">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search Medium" />
          </div>
        </div>

        <div className="navbar-right">
          <Link href="/write" className="nav-icon-btn write-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Write</span>
          </Link>

          {session ? (
            <div className="profile-menu">
              <button
                className="avatar-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {session.user?.name?.[0] || "U"}
                  </div>
                )}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{session.user?.name}</p>
                    <p className="dropdown-email">{session.user?.email}</p>
                  </div>
                  <hr />
                  <Link href="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="sign-in-btn" onClick={() => signIn("google")}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
