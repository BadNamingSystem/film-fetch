// DATA
export type MovieObj = {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
}

export type MovieDetails = {
    Title: string
    Poster: string
    Runtime: string
    imdbRating: string
    imdbID: string
    Plot: string
    Released: string
    Actors: string
    Director: string
    Genre: string
}

export type WatchedObj = {
    title: string
    poster: string
    runtime: number
    imdbRating: number
    userRating: number
    imdbID: string
    countRatingDecisions?: number
}

// PROPS
export type SearchBarProps = {
    query: string
    setQuery: (arg: string) => void
}

export type MovieDetailsProps = {
    watched: WatchedObj[]
    selectedId: string
    handleCloseMovie: () => void
    handleAddToWatched: (watchedMovie: WatchedObj) => void
}

export type NumResultsProps = {
    movies: MovieObj[]
}

export type MovieListProps = {
    movies: MovieObj[]
    handleSelectedMovie: (arg: string) => void
}

export type MovieItemProps = {
    movie: MovieObj
    handleSelectedMovie: (arg: string) => void
}

export type WatchedSummaryProps = {
    watched: WatchedObj[]
}

export type WatchedMovieListProps = {
    watched: WatchedObj[]
    handleDeleteWatched: (id: string) => void
}

export type WatchedMovieItemProps = {
    movie: WatchedObj
    handleDeleteWatched: (id: string) => void
}
