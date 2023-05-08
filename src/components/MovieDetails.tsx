import React from "react";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

const MovieDetails: React.FC<Props> = ({ movie }) => {
  return (
    <div className="container mx-auto w-3/4 h-max bg-slate-200 text-slate-700 mt-4 p-2">
      <h2 className="font-bold">{movie.title}</h2>
      <h3> Director: {movie.director}</h3>
      <h3> Release Date: {movie.release_date}</h3>
      <p>{movie.opening_crawl}</p>
    </div>
  );
};

export default MovieDetails;
