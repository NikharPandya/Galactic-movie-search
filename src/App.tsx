import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";
import MovieDetailsPage from "./components/MovieDetailsPage";
function App() {
  return (
    <>
      <main className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-950 via-blue-400 to-blue-950 h-screen w-screen box-border">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm />
                  <MovieList />
                </>
              }
            />
            <Route path="/:movieId" element={<MovieDetailsPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
