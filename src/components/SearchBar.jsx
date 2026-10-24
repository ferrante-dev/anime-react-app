import { useState } from "react";
export default function SearchBar({ onSearch, initialSearch = "" }) {
  const [value, setValue] = useState(initialSearch);
  function submit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }
  return (
    <form className="anime__search" onSubmit={submit} role="search">
      <input
        className="anime__search--input"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by Title or Keyword"
        aria-label="Search anime"
      />
      <button className="anime__search--btn" type="submit" aria-label="Search">
        <span aria-hidden="true">⌕</span>
      </button>
    </form>
  );
}
