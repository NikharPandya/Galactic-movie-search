import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectMovieAndFetchDetails } from "../store";
import { Movie } from "../types";

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.movies);

  const handleMovieClick = (movie: Movie) => {
    dispatch(selectMovieAndFetchDetails(movie));
  };

  if (loading) {
    return (
      <>
        <div className="container mx-auto w-screen flex justify-center">
          <ul className="w-3/4">
            <li className="h-10 bg-slate-200 p-2 text-slate-700 hover:text-slate-400">
              {" "}
              Loading...
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="container mx-auto w-screen flex justify-center">
          <ul className="w-3/4">
            <li className="h-10 bg-slate-200 p-2 text-slate-700 hover:text-slate-400">
              {error}
            </li>
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto w-screen flex justify-center">
        <ul className="w-3/4">
          {results.map((movie: Movie) => (
            <li
              className="h-10 bg-slate-200 p-2 text-slate-700 hover:text-slate-400"
              key={movie.title}
              onClick={() => handleMovieClick(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
