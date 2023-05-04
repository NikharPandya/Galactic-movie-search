import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
    searchMoviesStart(state, action) {
      state.searchQuery = action.payload;
      state.loading = true;
      state.error = null;
    },
    searchMoviesSuccess(state, action) {
      state.searchQuery = action.payload;
      state.loading = false;
    },
    searchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

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
