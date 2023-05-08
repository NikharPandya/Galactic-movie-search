import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Movie } from "./types";
//  Declared MovieState interface types
interface MoviesState {
  searchQuery: string;
  results: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

// Declared Initial State

const initialState: MoviesState = {
  searchQuery: "",
  results: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

// Created readux slice with reducer functions
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Starts searching for the movie
    searchMoviesStart(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.loading = true;
      state.error = null;
      state.results = state.results.filter((movie: any) => {
        return (
          movie.title.charAt(0).toLowerCase() ===
          action.payload.charAt(0).toLowerCase()
        );
      });
    },
    // Changes the state to movie details
    searchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.results = action.payload;
      state.loading = false;
    },
    // If the serch fails to load the movie
    searchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // When individial movie is selected
    selectMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  searchMoviesStart,
  searchMoviesSuccess,
  searchMoviesFailure,
  selectMovie,
} = moviesSlice.actions;

//  Fetch data from the api
export const fetchMovies = (searchQuery: string) => async (dispatch: any) => {
  try {
    dispatch(searchMoviesStart(searchQuery));
    const response = await fetch(
      `https://swapi.dev/api/films/?search=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error("Error fetching movies from the API");
    }
    const data = await response.json();
    const movies = data.results
      .filter((movie: any) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .map((movie: any) => {
        const { title, director, release_date, opening_crawl } = movie;
        return { title, director, release_date, opening_crawl };
      });
    dispatch(searchMoviesSuccess(movies));
  } catch (error: any) {
    dispatch(searchMoviesFailure(error.message));
  }
};

// When individual movie is selected and ask for details to display
export const selectMovieAndFetchDetails =
  (movie: Movie) => async (dispatch: any) => {
    dispatch(selectMovie(movie));
  };
// Combined Reducers
const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
});

// Configured Store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
