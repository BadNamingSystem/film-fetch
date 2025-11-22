import type { WatchedMovieItemProps } from "../../types.ts";

export default function WatchedMovieItem({
  movie,
  handleDeleteWatched,
}: WatchedMovieItemProps) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        onClick={() => handleDeleteWatched(movie.imdbID)}
        className="btn-delete"
      >
        X
      </button>
    </li>
  );
}
