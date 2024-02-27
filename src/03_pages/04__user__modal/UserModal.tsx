import "./UserModal.scss";
import { useParams } from "react-router-dom";
import { Loader, useSubmit } from "@export";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type genre = {
  id?: number;
  name?: string;
};

export default function UserModal() {
  //custom hook
  const { handleSubmit, submitStatus, handleLoading } = useSubmit();
  const { movieId } = useParams();
  const fetchMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=f2b931532bd0c82b71f28726439a481e`;
    const res = await axios.get(url);
    return res.data;
  };
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: fetchMovie,
    placeholderData: keepPreviousData,
    staleTime: 1000,
  });
  if (isLoading) return <Loader />;
  if (isError) return <div className="error">❗ {error.message}</div>;
  const vote_average = parseFloat(movie.vote_average.toFixed(1))
    .toString()
    .includes(".")
    ? parseFloat(movie.vote_average.toFixed(1))
    : parseFloat(movie.vote_average.toFixed(1)) + ".0";
  const genres = movie?.genres
    ?.map((genre: genre) => genre?.name)
    .join(", ")
    .replace(/,\s*$/, "");

  const movie__rating__container = [
    { id: 1, "IMDB Rating": vote_average, Genere: genres },
  ];
  return (
    <>
      <section className="useModal__container">
        <Loader />
        <LazyLoadImage
          effect="blur"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          width={"100%"}
        />

        <div className="poster__img_container">
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          />
          <div className="data__container">
            <h1 className="movie__title">{movie?.title}</h1>
            <h2 className="movie__plot">Overview:</h2>
            <p className="plot__detail">{movie?.overview}</p>
            {movie__rating__container?.map((data) => {
              return (
                <div className="movie__rating__container" key={data?.id}>
                  <p className="label__tag">
                    <span>IMDB:</span>
                    <span className="label__data">⭐{data["IMDB Rating"]}</span>
                  </p>
                  <p className="label__tag">
                    <span>Genere:</span>
                    <span className="label__data">{data["Genere"]}</span>
                  </p>
                </div>
              );
            })}
            <div className="btn__watchlist__container">
              {handleLoading && handleLoading ? (
                <div className="status">Please Wait..</div>
              ) : (
                <div className="status">{submitStatus}</div>
              )}
              <button
                className="btn__watchlist"
                onClick={() => handleSubmit(movie)}
              >
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
