import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieGrid from "./MovieGrid/MovieGrid";
import Loader from "./Loader/Loader";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const handleSearch = async (movie: string) => {
    try {
      const data = await fetchMovies(movie);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = () => {

  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}
      {isLoading && <Loader/>}
      <Toaster />
    </div>
  );
}

export default App;
