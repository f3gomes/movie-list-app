import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { getMovies } from "../../actions/getMovieList";
import { addNewMovie } from "../../actions/postNewMovie";
import { getMovieIMDB } from "../../actions/getMovieIMDB";
import { useGlobalContext } from "../../context/Provider";
import { useParams } from "react-router-dom";

export interface MovieDataProps {
  name: string;
  link: string;
  imgUrl: string;
}

export function Header() {
  const [resultList, setResultList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { setIsLoading, setMovieList } = useGlobalContext();

  const { group } = useParams();

  const handleGetMovieInfo = async (query: string) => {
    await getMovieIMDB(query, setResultList);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleGetMovieInfo(searchText);
  };

  const handleClearResults = () => {
    setSearchText("");
    setResultList([]);
  };

  const handleNewMovie = async (movie: any) => {
    const movieInfo = {
      group: group,
      name: movie.title,
      link: "https://www.themoviedb.org/movie/" + movie.id + "?language=pt-BR",
      imgUrl: "https://image.tmdb.org/t/p/original" + movie.poster_path,
      genreIds: movie.genre_ids,
    };

    if (confirm(`Adicionar o filme "${movie.title}" na lista?`)) {
      setSearchText("");
      setResultList([]);
      await addNewMovie(movieInfo, setIsLoading);

      setTimeout(() => {
        getMovies(setMovieList, setIsLoading, group);
      }, 1000);
    }
  };

  return (
    <>
      <div className="relative">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Digite o nome do filme e pressione Enter"
            className="h-10 border-2 px-9 w-full rounded-sm"
          />
        </form>

        {searchText !== "" ? (
          <IoMdCloseCircleOutline
            size={24}
            onClick={handleClearResults}
            className="absolute top-2 left-2 cursor-pointer text-slate-500 hover:text-slate-400 transition duration-200"
          />
        ) : (
          <IoSearch
            size={24}
            className="absolute top-2 left-2 text-slate-500"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[1280px]">
        {resultList.map((item: any) => (
          <div
            key={item.id}
            className="cursor-pointer px-2 py-1 hover:bg-slate-200 transition duration-200"
            onClick={() => handleNewMovie(item)}
          >
            {item.title} {"("}
            {item.release_date.substring(0, 4)}
            {")"}
          </div>
        ))}
      </div>
    </>
  );
}
