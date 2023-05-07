import React from "react";
import { useAppSelector } from "../store";
import { Movie } from "../types";

const MovieDetails: React.FC = () => {
  const selectedMovie = useAppSelector<Movie | null>(
    (state) => state.movies.selectedMovie
  );

  if (!selectedMovie) {
    return (
      <div className="container mx-auto w-3/4 h-max bg-slate-200 text-slate-700 mt-4 p-2 font-bold">
        select a movie to view
      </div>
    );
  }

  return (
    <div className="container mx-auto w-3/4 h-max bg-slate-200 text-slate-700 mt-4 p-2">
      <h2 className="font-bold">{selectedMovie.title}</h2>
      <h3> Director: {selectedMovie.director}</h3>
      <h3> Release Date: {selectedMovie.release_date}</h3>
      <p>{selectedMovie.opening_crawl}</p>
    </div>
  );
};

export default MovieDetails;
