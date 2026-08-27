import { useState } from "react";
import Button from "./Button";

function SearchBar({ search }: { search: (query: string) => void }) {
  const [query, setQuery] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    search(query);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="flex gap-6">
      <input
        className="flex-1 px-4 outline-none border-4 border-green font-body w-xl"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="What are you looking for?"
      />
      <Button label="Search" variant="green-fill" onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
