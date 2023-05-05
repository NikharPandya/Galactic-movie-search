import React from "react";

const MovieList: React.FC = () => {
  return (
    <>
      <div className="container mx-auto w-screen flex justify-center">
        <ul className="w-3/4">
          <li
            className="h-10 bg-slate-200 p-2 text-slate-700 hover:text-slate-400"
            key={1}>
            Movie title
          </li>
        </ul>
      </div>
    </>
  );
};

export default MovieList;
