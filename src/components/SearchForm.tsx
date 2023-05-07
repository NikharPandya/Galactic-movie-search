import React, { useState, useEffect } from "react";
import "../index.css";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "../store";
import { fetchMovies, searchMoviesStart } from "../store";

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchMovies(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchMoviesStart(searchQuery));
  };

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-40 w-screen p-6">
      <form onSubmit={handleSubmit} className="flex justify-center gap-4">
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Search for a Star Wars Movie"
          value={searchQuery}
          onChange={onHandleChange}
        />
        <button type="submit" className="btn gap-2">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
