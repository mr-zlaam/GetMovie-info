import "./All_Movies.scss";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { MoviesData } from "@types";
import { Button, Loader, Movie__Card } from "@export";
import LandingPage from "./Landing_Page";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { Fragment } from "react";
function All_Movies() {
  const [searchParams, setSearchParams] = useSearchParams({
    query: "",
    page: "1",
  });
  const pageNumber: number = parseInt(searchParams.get("page") || "1", 0);
  const query: string = (searchParams.get("query") || "").toString();
  const fetchMovies = async () => {
    let url = ``;
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=f2b931532bd0c82b71f28726439a481e&query=${query}&page=${pageNumber}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=f2b931532bd0c82b71f28726439a481e&page=${pageNumber}`;
    }
    const response: AxiosResponse<{ results: MoviesData[] }> = await axios.get(
      url
    );
    return response.data;
  };
  const { isLoading, isError, data, error } = useQuery<
    { results: MoviesData[] },
    Error
  >({
    queryKey: ["movies", pageNumber, query],
    queryFn: fetchMovies,
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });
  // query parameter

  if (isLoading)
    return (
      <div className="">
        <Loader />
      </div>
    );
  if (isError) return <div className="error">❗{error.message}</div>;

  const { results } = data!;
  //Move
  const handleNextMove = (pageNumber: number) => {
    setSearchParams((prev) => {
      const data = (pageNumber + 1).toString();
      prev.set("page", data);
      return prev;
    });
  };
  const handlePrevMove = (pageNumber: number) => {
    setSearchParams((prev) => {
      const data = Math.max(pageNumber - 1, 1).toString();
      prev.set("page", data);
      return prev;
    });
  };
  return (
    <>
      <LandingPage
        onChange={debounce((e) => {
          setSearchParams((prev) => {
            prev.set("query", e.target.value);
            prev.delete("page");
            return prev.toString().toLowerCase();
          });
        }, 1000)}
      />
      <section className="all__movies__container">
        {results.length <= 0 ? (
          <div className="noresult__found">! No Result Found</div>
        ) : (
          results?.map((movieData) => (
            <div key={movieData?.id} className="moviecard__grid">
              <Movie__Card movieData={movieData} />
            </div>
          ))
        )}
      </section>
      {results.length >= 1 && (
        <div className="globe__btn__container">
          {!query && (
            <Fragment>
              {pageNumber > 1 && (
                <Button
                  className="move__btn"
                  onClick={() => handlePrevMove(pageNumber || 0)}
                >
                  prev
                </Button>
              )}
              {pageNumber < 500 && (
                <Button
                  className="move__btn"
                  onClick={() => handleNextMove(pageNumber || 0)}
                >
                  Next
                </Button>
              )}
            </Fragment>
          )}
        </div>
      )}
    </>
  );
}

export default All_Movies;
