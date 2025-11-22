import type { MovieListProps } from "../../types.ts";
import MovieItem from "./MovieItem.tsx";

export default function MovieList({
  movies,
  handleSelectedMovie,
}: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          handleSelectedMovie={handleSelectedMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
