import React from "react";
import "../index.css";

const SearchForm: React.FC = () => {
  return (
    <form className="bg-slate-500 flex justify-center items-center h-40">
      <input
        className="w-74 h-10 mr-2"
        type="text"
        placeholder="Search for a Star Wars Movie"
      />
      <button type="submit" className="h-20 w-20 border">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
