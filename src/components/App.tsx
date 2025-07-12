import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (movie: string) => {
    try {
      const data = await fetchMovies(movie);
      if(data.length === 0){
        toast.error('No movies found for your request.')
      }
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
    </div>
  );
}

export default App;
