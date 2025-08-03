import axios from "axios";
import { Movie } from "../types/movie";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  results: Movie[];
}

export const fetchMovies = async (name: string): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
    const response = await axios.get<MovieResponse>(url, options);
    return response.data.results;
};
