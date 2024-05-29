import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <div className="navbar">
      <Logo />
      {children}
      <Favourits />
    </div>
  );
}

export default Navbar;

// Component composition -> remove additional layers
function Logo() {
  return (
    <div className="navbar__logo">
      <img src="./assets/images/logo.png" alt="logo" className="header-logo" />
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ nomOfResult }) {
  return <div className="navbar__result">Found {nomOfResult} characters</div>;
}

function Favourits() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">4</span>
    </button>
  );
}
