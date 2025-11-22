import type { WatchedMovieListProps } from "../../types.ts";
import WatchedMovieItem from "./WatchedMovieItem.tsx";

export default function WatchedMovieList({
  watched,
  handleDeleteWatched,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          movie={movie}
          handleDeleteWatched={handleDeleteWatched}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
