import { useEffect, useState } from "react";
import { MovieCard, MovieProps } from "../MovieCard";
import { getMovies } from "../../actions/getMovieList";
import { sendLike } from "../../actions/sendLike";
import { sendStatus } from "../../actions/sendStatus";
import { useGlobalContext } from "../../context/Provider";
import { useParams } from "react-router-dom";

export function MovieList() {
  const [watched, setWatched] = useState(false);
  const { isLoading, setIsLoading, movieList, setMovieList } =
    useGlobalContext();

  const { group } = useParams();

  const handleSubmitLike = (id: string) => {
    if (confirm("Enviar Like?")) {
      sendLike(id, 1, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading, group);
      }, 1000);
    }
  };

  const handleSubmitDisLike = (id: string) => {
    if (confirm("Remover Like?")) {
      sendLike(id, -1, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading, group);
      }, 1000);
    }
  };

  const handleSubmitWatched = (id: string) => {
    const status = !getMovieStatusById(id);

    if (confirm("Atualizar status?")) {
      sendStatus(id, status, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading, group);
      }, 1000);
    }
  };

  const getMovieStatusById = (id: string) => {
    const movie = movieList.filter((item: MovieProps) => item._id === id)[0];

    if (movie) {
      const { watched } = movie;
      return watched;
    }
  };

  const handleFilterToggle = () => {
    setWatched(!watched);
  };

  const filteredList = movieList.filter((movie) => {
    return watched ? movie.watched : !movie.watched;
  });

  useEffect(() => {
    getMovies(setMovieList, setIsLoading, group);
  }, [setIsLoading, setMovieList, group]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="animate-ping inline-flex rounded-full mr-3 h-6 w-6 bg-sky-500 mt-2"></div>
      </div>
    );
  }

  return (
    <>
      {movieList.length === 0 ? (
        <div className="w-full flex justify-center text-slate-900 mt-4">
          Nenhum filme adicionado
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              id="filter"
              name="filter"
              type="checkbox"
              checked={watched}
              className="scale-125"
              onChange={handleFilterToggle}
            />
            <label htmlFor="filter">Filmes já assistidos</label>
          </div>

          {filteredList.map((item: MovieProps) => {
            return (
              <MovieCard
                movie={item}
                key={item._id}
                handleSubmitLike={handleSubmitLike}
                handleSubmitDisLike={handleSubmitDisLike}
                handleSubmitWatched={handleSubmitWatched}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
