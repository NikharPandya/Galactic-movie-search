import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <>
      <main className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-950 via-blue-200 to-blue-950 h-screen w-screen box-border">
        <SearchForm />
        <MovieList />
        <MovieDetails />
      </main>
    </>
  );
}

export default App;
