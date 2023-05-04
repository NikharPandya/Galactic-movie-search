import React from "react";
import "../index.css";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchForm: React.FC = () => {
  return (
    <div className="h-40 w-screen p-6">
      <form className="flex justify-center gap-4">
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Search for a Star Wars Movie"
        />
        <button type="submit" className="btn gap-2">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
