import type { SearchBarProps } from "../../types.ts";
import { useRef } from "react";
import useKey from "../../hooks/useKey.ts";

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    // Stop executing if the search bar is already focused
    if (document.activeElement === inputEl.current) return;
    // Pressing the 'Enter' key focuses the search bar and clears the search query
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
