import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Movie } from "../../types/movie";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);
      const response = await fetchMovies(query);
      if (response.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-center" />
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal}/>}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal}/>
      )}
    </>
  );
}
