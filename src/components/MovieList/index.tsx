import { useEffect } from "react";
import { MovieCard } from "../MovieCard";
import { getMovies } from "../../actions/getMovieList";
import { sendLike } from "../../actions/sendLike";
import { sendStatus } from "../../actions/sendStatus";
import { useGlobalContext } from "../../context/Provider";

export function MovieList() {
  const { isLoading, setIsLoading, movieList, setMovieList } =
    useGlobalContext();

  const handleSubmitLike = (id: string) => {
    if (confirm("Enviar Like?")) {
      sendLike(id, 1, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading);
      }, 1000);
    }
  };

  const handleSubmitDisLike = (id: string) => {
    if (confirm("Remover Like?")) {
      sendLike(id, -1, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading);
      }, 1000);
    }
  };

  const handleSubmitWatched = (id: string) => {
    const status = !getMovieStatusById(id);

    if (confirm("Atualizar status?")) {
      sendStatus(id, status, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading);
      }, 1000);
    }
  };

  const getMovieStatusById = (id: string) => {
    const movie = movieList.filter((item: any) => item._id === id)[0];

    if (movie) {
      const { watched }: any = movie;
      return watched;
    }
  };

  useEffect(() => {
    getMovies(setMovieList, setIsLoading);
  }, [setIsLoading, setMovieList]);

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
          {movieList.map((item: any) => {
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
