import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import MovieDetails from "./MovieDetails";
import { fetchMovies } from "../store";
import { HomeIcon } from "@heroicons/react/24/outline";

const MovieDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movieId } = useParams<{ movieId?: string }>();
  const selectedMovie = useAppSelector((state) => {
    return state.movies.results.find(
      (movie) =>
        movie.title.toLowerCase().replaceAll(" ", "-") ===
        movieId?.toLowerCase()
    );
  });

  const searchQuery = useAppSelector((state) => state.movies.searchQuery);
  useEffect(() => {
    dispatch(fetchMovies(searchQuery));
  }, [dispatch, searchQuery]);

  if (!selectedMovie) {
    return (
      <>
        <main className="h-screen container mx-auto box-border flex flex-col">
          <div className="h-40 w-screen p-1">
            <button className="btn btn-square">
              <HomeIcon className="h-6 w-6"></HomeIcon>
            </button>
          </div>
          <div className="w-3/4 h-max bg-slate-200 text-slate-700 mt-4">
            select a movie for details
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <MovieDetails movie={selectedMovie} />
    </>
  );
};

export default MovieDetailsPage;
