import { useCallback, useState } from "react";
import { STORAGE_KEY } from "./config.ts";
import type { WatchedObj } from "./types.ts";
import MovieDetails from "./Components/movies/MovieDetails.tsx";
import Loader from "./Components/ui/Loader.tsx";
import ErrorMessage from "./Components/ui/ErrorMessage.tsx";
import WatchedSummary from "./Components/watched/WatchedSummary.tsx";
import NavBar from "./Components/layout/NavBar.tsx";
import SearchBar from "./Components/ui/SearchBar.tsx";
import NumResults from "./Components/layout/NumResults.tsx";
import Main from "./Components/layout/Main.tsx";
import Box from "./Components/layout/Box.tsx";
import useMovie from "./hooks/useMovie.ts";
import useLocalStorage from "./hooks/useLocalStorage.ts";
import MovieList from "./Components/movies/MovieList.tsx";
import WatchedMovieList from "./Components/watched/WatchedMovieList.tsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useLocalStorage<WatchedObj[]>([], STORAGE_KEY);

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  function handleSelectedMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddToWatched(movie: WatchedObj) {
    setWatched((watched) => [movie, ...watched]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  const { movies, isLoading, error } = useMovie(query, handleCloseMovie);

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box className="results-box">
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box className="details-box">
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddToWatched={handleAddToWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
