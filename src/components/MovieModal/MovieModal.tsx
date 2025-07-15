import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import noImage from "../../assets/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

const modalRef = document.querySelector("#modal-root")!;

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

const MovieModal = ({ onClose, movie }: MovieModalProps) => {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : noImage
          }
          alt="movie_title"
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRef
  );
};

export default MovieModal;
