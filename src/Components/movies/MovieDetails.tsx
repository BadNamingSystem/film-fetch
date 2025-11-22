// noinspection ExceptionCaughtLocallyJS

import type {
  MovieDetails,
  MovieDetailsProps,
  WatchedObj,
} from "../../types.ts";
import { useEffect, useState } from "react";
import { getJSON } from "../../helpers.ts";
import { API_URL } from "../../config.ts";
import StarRating from "../ui/StarRating.tsx";
import Loader from "../ui/Loader.tsx";
import useKey from "../../hooks/useKey.ts";

export default function MovieDetails({
  watched,
  selectedId,
  handleCloseMovie,
  handleAddToWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    imdbID,
    Plot: plot,
    Released: released,
    Actors: cast,
    Director: director,
    Genre: genre,
  } = movie || {};

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const data = await getJSON(
          `${API_URL}&i=${selectedId}`,
          "Failed to fetch movie details"
        );
        if (data.Response === "False") throw new Error("Something went wrong");
        setMovie(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void getMovieDetails();
  }, [selectedId]);

  useKey("Escape", handleCloseMovie);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "filmFetch";
    };
  }, [title]);

  function createWatched() {
    if (!movie || !userRating) return;

    const watchedMovie: WatchedObj = {
      title: movie.Title,
      poster: movie.Poster,
      runtime: parseInt(movie.Runtime.split(" ").at(0) || "0"),
      imdbRating: parseFloat(movie.imdbRating),
      userRating,
      imdbID: selectedId,
    };
    handleAddToWatched(watchedMovie);
    handleCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    key={imdbID}
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={createWatched} className="btn-add">
                      Add to watched
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie 🌟{watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {cast}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
