import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import MovieDetails from "./MovieDetails";
import { fetchMovies } from "../store";

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
        <div className="container mx-auto w-3/4 h-max bg-slate-200 text-slate-700 mt-4 p-2">
          <h2 className="font-bold">Movie not Found</h2>
        </div>
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
