import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { selectMovieAndFetchDetails } from "../store";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Movie } from "../types";

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.movies);

  const handleMovieClick = (movie: Movie) => {
    dispatch(selectMovieAndFetchDetails(movie));
    navigate(`/${movie.title.toLowerCase().replaceAll(" ", "-")}`);
  };

  if (loading) {
    return (
      <>
        <div className="container mx-auto w-screen flex justify-center">
          <ul className="w-3/4">
            <li className="h-10 bg-blue-950 p-2 text-zinc-300 hover:text-blue-500">
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
            <li className="h-10 bg-blue-950 p-2 text-zinc-300 hover:text-blue-500">
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
        <ul className="w-4/5 mx-2">
          {results.map((movie: Movie) => (
            <li
              className="flex items-center group gap-2 pl-2 h-10 bg-blue-950 m-2 text-zinc-300 hover:text-blue-500 group-hover:outline rounded "
              key={movie.title}>
              <LinkIcon className="h-4 w-4 group-hover:scale-1 group-hover:text-blue-500 group-hover:-translate-y-1 group-hover:transition" />
              <Link
                to={`/${movie.title.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => handleMovieClick(movie)}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
