import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Movie } from "./types";

interface MoviesState {
  searchQuery: string;
  results: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  searchQuery: "",
  results: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMoviesStart(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.loading = true;
      state.error = null;
    },
    searchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.results = action.payload;
      state.loading = false;
    },
    searchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
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
    const movies = data.results.map((movie: any) => {
      const { title, director, release_date, opening_crawl } = movie;
      return { title, director, release_date, opening_crawl };
    });
    dispatch(searchMoviesSuccess(movies));
  } catch (error: any) {
    dispatch(searchMoviesFailure(error.message));
  }
};

export const selectMovieAndFetchDetails =
  (movie: Movie) => async (dispatch: any) => {
    dispatch(selectMovie(movie));
  };

const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
