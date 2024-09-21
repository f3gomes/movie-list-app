import { api } from "./api";

export const getMovies = async (
  setMovieList: (value: any) => void,
  setIsLoading: (value: boolean) => void,
  group: string | undefined
) => {
  try {
    setIsLoading(true);
    const response = await api.get(`/api/movie/list/${group}`);
    setMovieList(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
