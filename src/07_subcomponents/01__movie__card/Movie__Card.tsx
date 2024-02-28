import { useEffect, useState } from "react";
import "./Movie__Card.scss";
import { Link } from "react-router-dom";
import { MoviesData } from "@/types";
interface MoviesDataProps {
  movieData: MoviesData;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../02__loader/Loader";

function Movie__Card({ movieData }: MoviesDataProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const image = `https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`;
  const dummyImage = `https://image.tmdb.org/t/p/w500/xiLFc19JANfAZHbecqoCFpmtiUV.jpg`;
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = image;
  }, [image]);

  return (
    <>
      <div className="main__card">
        {!isImageLoaded ? (
          <div className="img__placeholder">
            <Loader />
          </div>
        ) : (
          <Link to={`/all-movies/${movieData?.id}`}>
            {movieData?.backdrop_path ? (
              <LazyLoadImage
                placeholder={<div className="img__placeholder" />}
                effect="blur"
                src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`}
                alt={movieData?.title}
              />
            ) : (
              <LazyLoadImage
                placeholder={<div className="img__placeholder" />}
                effect="blur"
                src={dummyImage}
                alt={movieData?.title}
              />
            )}
          </Link>
        )}
        <span>
          <Link to={`/all-movies/${movieData?.id}`} className="card__button">
            {movieData?.title}
          </Link>
        </span>
      </div>
    </>
  );
}

export default Movie__Card;
