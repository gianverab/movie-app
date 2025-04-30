import { Movie, MovieDetailsProps } from "@/interfaces/interfaces";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    const movies: Movie[] = data.results;
    return movies;
  } catch (error: any) {
    console.error("Failed to fetch movies", error.message);
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetailsProps> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data: MovieDetailsProps = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch movie details", error);
    throw new Error("Failed to fetch movie details");
  }
};
