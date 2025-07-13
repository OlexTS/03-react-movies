import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieGrid from "./MovieGrid/MovieGrid";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (movie: string) => {
    try {
      setError(null)
      setIsLoading(true);
      const data = await fetchMovies(movie);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch (error) {
      console.log(error);
      setError('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = () => {};

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid onSelect={handleSelect} movies={movies} />
        )
      )}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
}

export default App;
