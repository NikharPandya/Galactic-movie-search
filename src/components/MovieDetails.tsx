import React from "react";
import { Movie } from "../types";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieDetails: React.FC<Props> = ({ movie }) => {
  return (
    <>
      <div className="md:h-40 h-30 w-screen p-6 flex justify-center">
        <Link to={"/"}>
          <button className="btn btn-square">
            <HomeIcon className="h-6 w-6"></HomeIcon>
          </button>
        </Link>
      </div>
      <div className="container mx-auto w-4/5 h-max p-4 m-2 rounded bg-blue-950 text-zinc-200 mt-4">
        <h2 className="font-sans font-bold md:text-2xl text-l pb-2">
          {movie.title}
        </h2>
        <h3 className="md:text-l text-base pb-2">
          <strong>Director: </strong> {movie.director}
        </h3>
        <h3 className="md:text-l text-base pb-2">
          {" "}
          <strong>Release Date: </strong> {movie.release_date}
        </h3>
        <p className="md:text-base/7  text-sm/7">{movie.opening_crawl}</p>
      </div>
    </>
  );
};

export default MovieDetails;
