import { PropsWithChildren, createContext, useContext, useState } from "react";
import { MovieProps } from "../components/MovieCard";

type ContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  movieList: MovieProps[];
  setMovieList: (value: any) => void;
};
export const GlobalContext = createContext<ContextType>({
  isLoading: true,
  setIsLoading: () => { },
  movieList: [],
  setMovieList: () => { },
});

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<ContextType["isLoading"]>(true);
  const [movieList, setMovieList] = useState<MovieProps[]>([]);

  return (
    <GlobalContext.Provider
      value={{ isLoading, setIsLoading, movieList, setMovieList }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside the GlobalProvider");
  }

  return context;
};
