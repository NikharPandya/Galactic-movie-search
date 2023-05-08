import React, { useState, useEffect, useCallback } from "react";
import "../index.css";
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

  // When the search query is changed the submission callback will dispatch the reducer
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(searchMoviesStart(searchQuery));
    },
    [dispatch, searchQuery]
  );

  // Sets the typed value to the search query
  const onHandleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );
  //  When the user presses enter the search reducers is dispatched
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        dispatch(searchMoviesStart(searchQuery));
      }
    },
    [dispatch, searchQuery]
  );

  return (
    <div className="md:h-40 h-30 w-screen p-6">
      <form onSubmit={handleSubmit} className="flex justify-center gap-4">
        <input
          className="input input-bordered w-full max-w-xs focus:border-1 bg-blue-950 focus:border-slate-200 placeholder:opacity-90 text-slate-200 hover:placeholder:text-slate-50"
          type="text"
          placeholder="Search for a Star Wars Movie"
          value={searchQuery}
          onChange={onHandleChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default SearchForm;
